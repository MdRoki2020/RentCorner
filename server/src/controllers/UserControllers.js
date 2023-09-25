const UsersModel = require('../models/UsersModel');
const jwt=require('jsonwebtoken');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');
const AllRoomsModel = require('../models/AllRoomsModel');
const CommentsModel =require('../models/CommentsModel');
const BookingModel = require('../models/BookingModel');
const LoveZoneModel = require('../models/LoveZone');
const AgreementModel = require('../models/AgreementModel');


//user Registration
exports.CreateUser = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file attached" });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'RENT_CORNER/UsersPhoto',
        public_id: uuidv4(),
        transformation: [
          { width: 864, height: 864 }
        ]
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



  //filter properties by category
  exports.FilterByCategories = (req, res) => {
    const PropertiesCategory = req.params.categories;
    const searchTerm = req.params.search;
  
    let Query = { Category: PropertiesCategory };
  
    if (searchTerm) {
      Query = {
        $and: [
          { Category: PropertiesCategory },
          {
            $or: [
              { Address: { $regex: searchTerm, $options: 'i' } },
              { ZipCode: { $regex: searchTerm, $options: 'i' } },
              { Thana: { $regex: searchTerm, $options: 'i' } },
              { District: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        ],
      };
    }
  
    AllRoomsModel.find(Query)
    .sort({createdAt:'desc'})
      .exec()
      .then((data) => {
        res.status(200).json({ status: 'success', data: data });
      })
      .catch((err) => {
        res.status(400).json({ status: 'fail', error: err.message });
      });
  };
  




  //Read Properties By Id
  exports.ReadDataById = (req, res) => {
    const id = req.params.id;
    const Query = { _id: id };
  
    AllRoomsModel.find(Query)
      .exec()
      .then((data) => {
        res.status(200).json({ status: "success",data: data });
      })
      .catch((err) => {
        res.status(400).json({ status: "fail", error: err.message });
      });
  };

//create comments
exports.CreateComment = (req, res) => {
  let reqBody = req.body;

  CommentsModel.create(reqBody)
    .then(data => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch(err => {
      res.status(400).json({ status: "fail", data: err });
    });
};


//show comment by id
exports.ReadCommentByPropertiesId = (req, res) => {
  let PropertiesId = req.params.PropertiesId;

  CommentsModel.aggregate([
    { $match: { PropertiesId: PropertiesId } },
    { $sort: { createdDate: -1 } },
    {
      $project: {
        _id: 0,
        PropertiesId: 1,
        Comments: 1,
        createdDate: 1,
      },
    },
  ])
    .then((data) => {
      res.status(200).json({ status: 'success', data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: 'fail', data: err });
    });
};

//Related Product
exports.RelatedProductByCategory = (req, res) => {
  const category = req.params.category;
  const Query = { Category: category };

  AllRoomsModel.find(Query)
    .exec()
    .then((data) => {
      res.status(200).json({ status: "success",data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", error: err.message });
    });
};

//Booking Request
exports.BookingRequest = (req, res) => {
  let reqBody = req.body;

  BookingModel.create(reqBody)
    .then(data => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch(err => {
      res.status(400).json({ status: "fail", data: err });
    });
};


//All Properties
exports.AllPropertiesList = (req, res) => {
  AllRoomsModel.find()
    .then((data) => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", error: err });
    });
};



//Add properties Love Zone
exports.CreateLoveZoneList = (req, res) => {
  let reqBody = req.body;

  LoveZoneModel.create(reqBody)
    .then(data => {
      res.status(200).json({ status: "success", data: data });
    })
    .catch(err => {
      res.status(400).json({ status: "fail", data: err });
    });
};

//find lovezone properties filter by user email 
exports.ReadLoveZonePropertiesByEmail = (req, res) => {
  const userEmail = req.params.userEmail;
  const Query = { userEmail: userEmail };

  LoveZoneModel.find(Query)
    .sort({ createdDate: 'desc' }) 
    .exec()
    .then((data) => {
      res.status(200).json({ status: "success",data: data });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", error: err.message });
    });
};


//delete loveList
exports.DeleteLoveList = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await LoveZoneModel.deleteOne({ _id: id });

    if (deletedTask.deletedCount === 0) {
      res.status(404).json({ status: 'fail', message: 'Task not found' });
    } else {
      res.status(200).json({ status: 'success', data: deletedTask });
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', data: error.message });
  }
};


exports.FilterDistrictAndCategory = async (req, res) => {
  try {
    const district = req.params.selectedDistrict;
    const category = req.params.selectedCategory;

    if (!district || !category) {
      return res.status(400).json({ status: 'fail', message: 'Missing parameters' });
    }

    const Query = { District: district, Category: category };

    const data = await AllRoomsModel.find(Query).exec();
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'An error occurred' });
  }
};


//searchByPriceAndSearch 'desc' order
exports.searchByPriceAndSearch = async (req, res) => {
  const { minPrice, maxPrice, search } = req.query;

  try {
    let query = {};

    if (minPrice && maxPrice) {
      query = {
        $or: [
          { AppartmentPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } },
          { UnitPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } },
          { LevelPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } },
          { UnitRentPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } },
          { RoomRentPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } },
        ],
      };
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { District: { $regex: search, $options: 'i' } },
          { Thana: { $regex: search, $options: 'i' } },
          { ZipCode: { $regex: search, $options: 'i' } },
          { Address: { $regex: search, $options: 'i' } },
          { RoadNumber: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const sortCondition = { createdAt: 'desc' };
    const rooms = await AllRoomsModel.find(query).sort(sortCondition);

    res.status(200).json({ status: 'success', data: rooms });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for rooms.' });
  }
};



exports.ReadAgreementData = (req, res) => {
  AgreementModel.find()
    .exec()
    .then((data) => {
      res.status(200).json({ status: 'success', data: data });
    })
    .catch((error) => {
      console.error("Error reading agreement data:", error);
      res.status(500).json({ status: 'error', message: 'Something went wrong' });
    });
};

exports.ReadAllProperties=(req,res)=>{
  AllRoomsModel.find()
  .exec()
  .then((data)=>{
    res.status(200).json({status:'success',data:data});
  }).catch((err)=>{
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  })
}

exports.ReadAllUser=(req,res)=>{
  UsersModel.find()
  .exec()
  .then((data)=>{
    res.status(200).json({status:'success',data:data});
  }).catch((err)=>{
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  })
}












