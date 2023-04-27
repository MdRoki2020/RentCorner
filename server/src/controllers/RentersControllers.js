const AllRoomsModel = require('../models/AllRoomsModel');
const cloudinary = require('../helpers/cloudinary');
const { v4: uuidv4 } = require('uuid');


//For Create Rooms
exports.CreateRooms = async (req, res) => {
  const { RenterEmail, Category, HouseName, HouseNumber, UnitNumber, LevelNumber, UnitsPerLevel, Features, AppartmentPrice, UnitPrice, LevelPrice, UnitRentPrice, RoomRentPrice, District, Thana, ZipCode, Address, RoadNumber } = req.body;

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
        folder: 'RENT_CORNER/Rooms_Images',
        public_id: uuidv4() 
      });

      images.push({
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id
      });
    }

    // upload the single dynamic image to cloudinary and save the URL in the DynamicImage field
    const dynamicImageResult = await cloudinary.uploader.upload(req.files.DynamicImage[0].path, {
      folder: 'RENT_CORNER/Rooms360_Images',
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
      position: { // set default value for position if not included in request body
        type: 'Point',
        coordinates: [0, 0]
      }
    });

    res.status(201).json({status: 'success', data: product});

  } catch (error) {
    console.error(error);

    // delete uploaded images in case of error
    for (const file of req.files.Image) {
      await cloudinary.uploader.destroy(file.filename);
    }

    await cloudinary.uploader.destroy(req.files.DynamicImage[0].filename);

    // handle JSON parse error separately
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


