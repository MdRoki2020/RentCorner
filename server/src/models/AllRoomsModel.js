const mongoose = require('mongoose');

const AllRoomsSchema = new mongoose.Schema(
  {
    RenterEmail: { type: String },
    Category: { type: String },
    HouseName: { type: String },
    HouseNumber: { type: String },
    UnitNumber: { type: String },
    LevelNumber: { type: String },
    UnitsPerLevel: { type: String },
    Features: { type: String },
    Images: [
      {
        imageUrl: { type: String },
        cloudinary_id: { type: String },
      },
    ],
    DynamicImage: { type: String },
    AppartmentPrice: { type: Number },
    UnitPrice: { type: Number },
    LevelPrice: { type: Number },
    UnitRentPrice: { type: Number },
    RoomRentPrice: { type: Number },
    District: { type: String },
    Thana: { type: String },
    ZipCode: { type: String },
    Address: { type: String },
    RoadNumber: { type: String },
    Status: { type: String },
    position: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('allRooms', AllRoomsSchema);
