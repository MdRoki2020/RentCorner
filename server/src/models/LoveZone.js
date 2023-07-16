const mongoose=require('mongoose');
const LoveZoneSchema=mongoose.Schema({
    userEmail:{type:String},
    PropertiesId:{type:String},
    image:{type:String},
    category:{type:String},
    HouseName:{type:String},
    Status:{type:String},
    createdDate:{type:Date,default:Date.now()}
});
const LoveZoneModel=mongoose.model('LoveZones',LoveZoneSchema);
module.exports=LoveZoneModel;