const UsersModel = require('../models/UsersModel');
const jwt=require('jsonwebtoken');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');
const AllRoomsModel = require('../models/AllRoomsModel');


//user Registration
exports.CreateUser = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file attached" });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'RENT_CORNER/UsersPhoto',
        public_id: uuidv4()
      });
  
      const users = new UsersModel({
        Name: req.body.Name,
        Mobile: req.body.Mobile,
        Email: req.body.Email,
        Nid: req.body.Nid,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
        Password: req.body.Password,
      });
      const data = await users.save();
      res.status(200).json({ status: "success", data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  
  
  //User Login
  exports.LoginUser = (req, res) => {
    const reqBody = req.body;
    UsersModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 0, Email: 1, imageUrl: 1, Name: 1, Mobile: 1, Nid: 1 } }
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






  //ReadProduct By Id
  exports.FilterByCategories = (req, res) => {
    const PropertiesCategory = req.params.categories;
    const Query = { Category: PropertiesCategory };
  
    AllRoomsModel.find(Query)
      .exec()
      .then((data) => {
        res.status(200).json({ status: "success", data: data });
      })
      .catch((err) => {
        res.status(400).json({ status: "fail", error: err.message });
      });
  };
  



//Read Products
//match by ProductCategories
// exports.FilterByCategories=(req,res)=>{
//   let PropertiesCategory=req.params.PropertiesCategory;

//   AllRoomsModel.aggregate([
//       {$match:{Category:PropertiesCategory}}, //first ProductCategories from database
//       {$project:{
//           _id:1,RenterEmail:1,Category:1,HouseName:1,HouseNumber:1,UnitNumber:1,LevelNumber:1,UnitsPerLevel:1,Features:1,Images:1,DynamicImage:1,AppartmentPrice:1,UnitPrice:1,LevelPrice:1,UnitRentPrice:1,RoomRentPrice:1,District:1,Thana:1,ZipCode:1,Address:1,RoadNumber:1,Status:1,position:1,createdAt:1,

//       }}
//   ],(err,data)=>{
//       if(err){
//           res.status(400).json({status:"fail",data:err})
//       }else{
//           res.status(200).json({status:"success",data:data})
//       }
//   })
// }
  