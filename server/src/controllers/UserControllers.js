const AllRoomsModel = require('../models/AllRoomsModel');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');

exports.createRooms = async (req, res) => {
    const { RenterEmail, Category, HouseName, HouseNumber, UnitNumber, LevelNumber, UnitsPerLevel, Features, AppartmentPrice, UnitPrice, LevelPrice, UnitRentPrice, RoomRentPrice, District, Thana, ZipCode, Address, RoadNumber, position } = req.body;
  
    // check if any file is uploaded
    if (!req.files || !req.files.Image || !req.files.Image.length || !req.files.DynamicImage) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload at least one image and one dynamic image'
      });
    }
    
  
    try {
      const images = [];
  
      // upload each file to cloudinary and save the response in the images array
      for (const file of req.files.Image) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'RENT_CORNER', // specify the folder in which to store the images
          public_id: uuidv4() // generate a unique public_id for each image
        });
  
        images.push({
          imageUrl: result.secure_url,
          cloudinary_id: result.public_id
        });
      }
  
      // upload the single dynamic image to cloudinary and save the URL in the DynamicImage field
      const dynamicImageResult = await cloudinary.uploader.upload(req.files.DynamicImage.path, {
        folder: 'RENT_CORNER',
        public_id: uuidv4()
      });
  
      // create a new product with the given title, content, and images
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
        DynamicImage: dynamicImageResult.secure_url, // save the URL of the dynamic image
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
        position
      });
  
      // create a new place with the given coordinates
      const place = new AllRoomsModel({
        position: {
          type: 'Point',
          coordinates: position,
        },
      });
      await place.save();
  
      res.status(201).json({status: 'success', data: product});
  
    } catch (error) {
      console.error(error);
      res.status(400).json({status: 'error', message: 'Something went wrong'});
    }
  };
  