const AllRoomsModel = require('../models/AllRoomsModel');
const RentersInfoModel=require('../models/RentersInfoModel');
const OTPModel=require('../models/OtpModel');
const SendEmailUtility = require('../utility/SendEmailUtility');
const jwt=require('jsonwebtoken');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');



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
        public_id: uuidv4() 
      });

      images.push({
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id
      });
    }

    const dynamicImageResult = await cloudinary.uploader.upload(req.files.DynamicImage[0].path, {
      folder: 'RENT_CORNER/Rooms360_Images',
      public_id: uuidv4()
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
exports.UpdateRoom = async (req, res) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    const { position } = req.body;

    const update = {
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





//For Renter Registration
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



//specific publisher product list
//match by publisherEmail
exports.SpecificRentersRoomList = (req, res) => {
  let RenterEmail = req.params.renterEmail;

  AllRoomsModel.aggregate([
    { $match: { RenterEmail: RenterEmail } }, //first PublisherEmail from database
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





//password recover api start.....
//recover verify email
exports.RecoverVerifyEmail=async (req,res)=>{
  let Email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000)
  try {
      // Email Account Query
      let UserCount = (await RentersInfoModel.aggregate([{$match: {Email:Email}}, {$count: "total"}]))
      if(UserCount.length>0){
          // OTP Insert
          let CreateOTP = await OTPModel.create({Email:Email, otp:OTPCode})
          // Email Send
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












