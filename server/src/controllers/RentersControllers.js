const AllRoomsModel = require('../models/AllRoomsModel');
const RentersInfoModel=require('../models/RentersInfoModel');
const OTPModel=require('../models/OtpModel');
const SendEmailUtility = require('../utility/SendEmailUtility');
const jwt=require('jsonwebtoken');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');
const BookingModel = require('../models/BookingModel');
const nodemailer = require('nodemailer');
const AgreementModel = require('../models/AgreementModel');
const fs = require('fs');
const { promisify } = require('util');
const { exec } = require('child_process');
const { error } = require('console');



//For Create Rooms
exports.CreateRooms = async (req, res) => {
  const { RenterEmail, Category, HouseName, HouseNumber, UnitNumber, LevelNumber, UnitsPerLevel, Features, AppartmentPrice, UnitPrice, LevelPrice, UnitRentPrice, RoomRentPrice, District, Thana, ZipCode, Address, RoadNumber, Status } = req.body;

  if (!req.files || !req.files.Image || !req.files.Image.length || !req.files.DynamicImage) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload at least one image and one dynamic image'
    });
  }

  try {
    const images = [];

    for (const file of req.files.Image) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'RENT_CORNER/Rooms_Images',
        public_id: uuidv4(),
        transformation: [
          { width: 1024, height: 1024 }
        ]
      });

      images.push({
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id
      });
    }

    const dynamicImageResult = await cloudinary.uploader.upload(req.files.DynamicImage[0].path, {
      folder: 'RENT_CORNER/Rooms360_Images',
      public_id: uuidv4(),
      transformation: [
        { width: 720, height: 360 }
      ]
    });

    const product = await AllRoomsModel.create({
      RenterEmail,
      Category,
      HouseName,
      HouseNumber,
      UnitNumber,
      LevelNumber,
      UnitsPerLevel,
      Features,
      Images: images,
      DynamicImage: dynamicImageResult.secure_url,
      AppartmentPrice,
      UnitPrice,
      LevelPrice,
      UnitRentPrice,
      RoomRentPrice,
      District,
      Thana,
      ZipCode,
      Address,
      RoadNumber,
      Status,
      position: {
        type: 'Point',
        coordinates: [0, 0]
      }
    });

    res.status(201).json({status: 'success', data: product});

  } catch (error) {
    console.error(error);

    for (const file of req.files.Image) {
      await cloudinary.uploader.destroy(file.filename);
    }

    await cloudinary.uploader.destroy(req.files.DynamicImage[0].filename);

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      res.status(400).json({ status: 'error', message: 'Invalid JSON' });
    } else {
      res.status(400).json({ status: 'error', message: error.message || 'Something went wrong' });
    }
  }
};


//For Update Position
exports.UpdateLocation = async (req, res) => {
  try {
    const { id, position } = req.body;
    const query = { _id: id };

    const update = {
      id,
      position: {
        type: 'Point',
        coordinates: position,
      },
    };

    const options = { new: true };

    const updatedPlace = await AllRoomsModel.findOneAndUpdate(query, update, options);

    res.status(200).json({ message: 'Place updated successfully', data: updatedPlace });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


//fetch place..
exports.PlaceGet = async (req, res) => {
  try {
    const places = await AllRoomsModel.find();
    res.status(200).json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//fetch place by id...
exports.PlaceGetById = async (req, res) => {
  try {
    const placeId = req.params.id;

    const places = await AllRoomsModel.find({ _id: placeId });

    if (places.length === 0) {
      return res.status(404).json({ message: 'Place not found for the given ID' });
    }
    res.status(200).json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
//Renter Registration
exports.CreateRenters = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file attached" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'RENT_CORNER/RentersPhoto',
      public_id: uuidv4()
    });

    const room = new RentersInfoModel({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Mobile: req.body.Mobile,
      Email: req.body.Email,
      imageUrl: result.secure_url,
      cloudinary_id: result.public_id,
      Password: req.body.Password,
      ConformPassword: req.body.ConformPassword
    });
    const data = await room.save();
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Renters Login
exports.RentersLogin = (req, res) => {
  const reqBody = req.body;
  RentersInfoModel.aggregate([
    { $match: reqBody },
    { $project: { _id: 0, Email: 1, imageUrl: 1, FirstName: 1 } }
  ])
    .then((data) => {
      if (data.length > 0) {
        const payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: data[0]["Email"]
        };
        const token = jwt.sign(payload, "Secretkey123456789");
        res.status(200).json({ status: "success", token: token, data: data[0] });
      } else {
        res.status(401).json({ status: "unauthorized" });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", data: err });
    });
};

exports.SpecificRentersRoomList = (req, res) => {
  let RenterEmail = req.params.renterEmail;

  AllRoomsModel.aggregate([
    { $match: { RenterEmail: RenterEmail } }, // Match rooms for the specific renter
    {
      $project: {
        _id: 1,
        RenterEmail: 1,
        Category: 1,
        HouseName: 1,
        HouseNumber: 1,
        UnitNumber: 1,
        LevelNumber: 1,
        UnitsPerLevel: 1,
        Features: 1,
        Images: 1,
        DynamicImage: 1,
        AppartmentPrice: 1,
        UnitPrice: 1,
        LevelPrice: 1,
        UnitRentPrice: 1,
        RoomRentPrice: 1,
        District: 1,
        Thana: 1,
        ZipCode: 1,
        Address: 1,
        RoadNumber: 1,
        Status: 1,
        position: 1,
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } }, // Sort by createdAt field in descending order
  ])
    .exec()
    .then((data) => {
      let count = data.length;
      res.status(200).json({ status: "success", count: count, data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", data: err });
    });
};



//count status by email
exports.CountBookedRoomByEmail = async (req, res) => {
  try {
    const email=req.params.email; // assuming the email is passed in the request body
    const data = await AllRoomsModel.countDocuments({ Status: 'Booked', RenterEmail: email });
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


//find all rooms
exports.AllRooms = (req, res) => {
  AllRoomsModel.find()
    .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", data: err });
    });
};




//total price sum by email
exports.SumPricesByEmail = (req, res) => {
  const email = req.params.email;

  AllRoomsModel.aggregate([
    { $match: { RenterEmail: email, Status: "Booked" } },
    {
      $group: {
        _id: null,
        totalAppartmentPrice: { $sum: { $toDouble: "$AppartmentPrice" } },
        totalUnitPrice: { $sum: { $toDouble: "$UnitPrice" } },
        totalLevelPrice: { $sum: { $toDouble: "$LevelPrice" } },
        totalUnitRentPrice: { $sum: { $toDouble: "$UnitRentPrice" } },
        totalRoomRentPrice: { $sum: { $toDouble: "$RoomRentPrice" } }
      }
    },
    {
      $project: {
        _id: 0,
        totalAppartmentPrice: { $ifNull: ["$totalAppartmentPrice", 0] },
        totalUnitPrice: { $ifNull: ["$totalUnitPrice", 0] },
        totalLevelPrice: { $ifNull: ["$totalLevelPrice", 0] },
        totalUnitRentPrice: { $ifNull: ["$totalUnitRentPrice", 0] },
        totalRoomRentPrice: { $ifNull: ["$totalRoomRentPrice", 0] },
        totalSum: {
          $add: [
            { $ifNull: ["$totalAppartmentPrice", 0] },
            { $ifNull: ["$totalUnitPrice", 0] },
            { $ifNull: ["$totalLevelPrice", 0] },
            { $ifNull: ["$totalUnitRentPrice", 0] },
            { $ifNull: ["$totalRoomRentPrice", 0] }
          ]
        }
      }
    }
  ])
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ status: "success", data: result[0] });
      } else {
        res.status(200).json({ status: "success", data: { totalSum: 0 } });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", data: err });
    });
};


//update status...
exports.UpdateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;

    const updatedTask = await AllRoomsModel.findByIdAndUpdate(id, { Status: status }, { new: true });

    res.status(200).json({ status: 'success', data: updatedTask });
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.message });
  }
};


//delete rooms
exports.DeleteRooms = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await AllRoomsModel.deleteOne({ _id: id });

    if (deletedTask.deletedCount === 0) {
      res.status(404).json({ status: 'fail', message: 'Task not found' });
    } else {
      res.status(200).json({ status: 'success', data: deletedTask });
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.message });
  }
};


//update product
exports.UpdateProperties = (req, res) => {
  const id = req.params.id;
  const Query = { _id: id };
  const reqBody = req.body;

  AllRoomsModel.updateOne(Query, reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ status: "fail", data: error });
    });
};


//find booking request filter by Email
exports.ReadBookingRequestByEmail = (req, res) => {
  const email = req.params.email;

  const Query = { RenterEmail: email};

  BookingModel.find(Query)
    .sort({ createdDate: 'desc' })
    .exec()
    .then((data) => {
      res.status(200).json({ status: 'success', data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: 'fail', error: err.message });
    });
};




//properties level chart
exports.PropertiesLevelChart = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await AllRoomsModel.aggregate([
      {
        $match: {
          RenterEmail: email,
        },
      },
      {
        $group: {
          _id: '$Category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


exports.getRoomStatusPercentage = async (req, res) => {
  try {
    const { email } = req.params;

    const totalRooms = await AllRoomsModel.countDocuments({ RenterEmail: email });
    const availableRooms = await AllRoomsModel.countDocuments({ RenterEmail: email, Status: 'Available' });
    const bookedRooms = await AllRoomsModel.countDocuments({ RenterEmail: email, Status: 'Booked' });

    const availablePercentage = (availableRooms / totalRooms) * 100;
    const bookedPercentage = (bookedRooms / totalRooms) * 100;

    res.json({ availablePercentage, bookedPercentage });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Agreement Request
exports.AgreementRequest = (req, res) => {
  let reqBody = req.body;

  AgreementModel.create(reqBody)
    .then(data => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch(err => {
      res.status(400).json({ status: "fail", data: err });
    });
};


//Agreement History
exports.AgreementHistory=(req,res)=>{

  let RenterEmail=req.params.email;
  let Query={RenterEmail:RenterEmail}
  
  AgreementModel.find(Query)
  .sort({createdDate: 'desc' })
  .exec()
  .then((data)=>{
    res.status(200).json({status:"success",data:data})
  }).catch((err)=>{
    res.status(400).json({status:"fail", data:err})
  })
}

//delete agreement
exports.DeleteAgreement = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await AgreementModel.deleteOne({ _id: id });

    if (deletedTask.deletedCount === 0) {
      res.status(404).json({ status: 'fail', message: 'Task not found' });
    } else {
      res.status(200).json({ status: 'success', data: deletedTask });
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.message });
  }
};

//update agreement status...
exports.UpdateAgreementStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;

    const updatedTask = await AgreementModel.findByIdAndUpdate(id, { AgreementStatus: status }, { new: true });

    res.status(200).json({ status: 'success', data: updatedTask });
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.message });
  }
};


//renter profile Update
exports.RenterUpdateProfile = (req, res) => {
  const email = req.params.email;
  const Query = { Email: email };
  const reqBody = req.body;

  RentersInfoModel.updateOne(Query, reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ status: "fail", data: error });
    });
};

//Read Renter Details
exports.ReadRenterDetails = (req, res) => {
  const userEmail = req.params.email;
  const Query={Email:userEmail}

  RentersInfoModel.find(Query).then((result)=>{
    res.status(200).json({ status: "success", data: result });

  }).catch((error)=>{
    res.status(400).json({ status: "fail", data: error });
  })
}

exports.ReadPublisherData = (req, res) => {
  RentersInfoModel.find()
    .exec()
    .then((data) => {
      res.status(200).json({ status: 'success', data: data });
    })
    .catch((error) => {
      console.error("Error reading agreement data:", error);
      res.status(500).json({ status: 'error', message: 'Something went wrong' });
    });
};
  




//password recover api start.....

//recover verify email
exports.RecoverVerifyEmail=async (req,res)=>{
  let Email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000)
  try {

      let UserCount = (await RentersInfoModel.aggregate([{$match: {Email:Email}}, {$count: "total"}]))
      if(UserCount.length>0){

          let CreateOTP = await OTPModel.create({Email:Email, otp:OTPCode})

          let SendEmail = await SendEmailUtility(Email,"Your PIN Code is= "+OTPCode,"RENT CORNER PIN Verification")
          res.status(200).json({status: "success", data: SendEmail})
      }
      else{
          res.status(200).json({status: "fail", data: "No User Found"})
      }

  }catch (e) {
      res.status(200).json({status: "fail", data:e})
  }
}


exports.RecoverVerifyOTP=async(req,res)=>{
  let Email=req.params.email;
  let OTPCode=req.params.otp;
  let status=0;
  let statusUpdate=1;

  try{

  let OTPCount=(await OTPModel.aggregate([{$match:{Email:Email,otp:OTPCode,status:status}},{$count:"total"}]))
  if(OTPCount.length>0){
      let OTPUpdate = await OTPModel.updateOne({Email:Email, otp:OTPCode, status:status}, {
          Email:Email,
          otp:OTPCode,
          status:statusUpdate
      })
      res.status(200).json({status:"success", data:OTPUpdate})

  }else{
      res.status(200).json({status:"fail",data:"invalid OTP Code"})
  }
}catch(e){
  res.status(200).json({status:"fail", data:e})
}

}


exports.RecoverResetPass=async (req,res)=>{

  let Email = req.body['email'];
  let OTPCode = req.body['OTP'];
  let NewPass =  req.body['password'];
  let statusUpdate=1;

  try {
      let OTPUsedCount = await OTPModel.aggregate([{$match: {Email: Email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
      if (OTPUsedCount.length>0) {
          let PassUpdate = await RentersInfoModel.updateOne({Email: Email}, {
              Password: NewPass
          })
          res.status(200).json({status: "success", data: PassUpdate})
      } else {
          res.status(200).json({status: "fail", data: "Invalid Request"})
      }
  }
  catch (e) {
      res.status(200).json({status: "fail", data:e})
  }
}

//password recover api end.....




//send conformation Email to user
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'mroki815@gmail.com',
//     pass: 'AaBbCc2580!!@@',
//   },
// });

let transporter = nodemailer.createTransport({
  host: 'mail.teamrabbil.com',
  port: 25,
  secure: false,
  auth: {
      user: "info@teamrabbil.com",
      pass: '~sR4[bhaC[Qs'
  },tls: {
      rejectUnauthorized: false
  },
});


exports.sendEmailToUser = async (req, res) => {
  const { from, to } = req.body;

  const mailOptions = {
    from: from,
    to: to,
    subject: 'Form BariBazarBd',
    text: 'Congratulations! Your request has been accepted.',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};











