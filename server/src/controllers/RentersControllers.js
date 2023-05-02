const AllRoomsModel = require('../models/AllRoomsModel');
const RentersInfoModel=require('../models/RentersInfoModel')
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');


//For Create Rooms
exports.CreateRooms = async (req, res) => {
  const { RenterEmail, Category, HouseName, HouseNumber, UnitNumber, LevelNumber, UnitsPerLevel, Features, AppartmentPrice, UnitPrice, LevelPrice, UnitRentPrice, RoomRentPrice, District, Thana, ZipCode, Address, RoadNumber } = req.body;

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
exports.RentersLogin=(req,res)=>{
  let reqBody=req.body;
  RentersInfoModel.aggregate([
      {$match:reqBody},
      {$project:{_id:0,Email:1,imageUrl:1,FirstName:1}}
  ],(err,data)=>{
      if(err){
          res.status(400).json({status:"fail",data:err})
      }else{
          if(data.length>0){
              let payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data[0]['Email']}
              let token=jwt.sign(payload,'Secretkey123456789');
              res.status(200).json({status:"success",token:token,data:data[0]})
          }else{
              res.status(401).json({status:"unauthorized"})
          }
      }
  })
}


