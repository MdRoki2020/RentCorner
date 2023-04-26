const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    
    //Houseinfo
    RenterEmail:{type:String},
    Category:{type:String},
    HouseName:{type:String},
    HouseNumber:{type:String},
    UnitNumber:{type:String},
    LevelNumber:{type:String},
    UnitsPerLevel:{type:String},
    Features:{type:String},

    //Multiple image
    Images: [{
        imageUrl: {
          type: String,
        },
        cloudinary_id: {
          type: String,
        }
    }],

    //360 image
    DynamicImage: {
        type: String,
    },

    //Price
    AppartmentPrice:{type:String},
    UnitPrice:{type:String},
    LevelPrice:{type:String},
    UnitRentPrice:{type:String},
    RoomRentPrice:{type:String},

    //Location
    District:{type:String},
    Thana:{type:String},
    ZipCode:{type:String},
    Address:{type:String},
    RoadNumber:{type:String},
    position: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },

    CreatedDate:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('AllRooms', placeSchema);
