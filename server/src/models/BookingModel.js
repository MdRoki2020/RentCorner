const mongoose=require('mongoose');
const BookingSchema=mongoose.Schema({
    propertiesId:{type:String},
    RenterEmail:{type:String},
    userName:{type:String},
    userEmail:{type:String},
    userMobile:{type:String},
    userNid:{type:String},
    userimageUrl:{type:String},
    category:{type:String},
    Status:{type:String},
    createdDate:{type:Date,default:Date.now()}
});
const BookingModel=mongoose.model('bookingRequests',BookingSchema);
module.exports=BookingModel;