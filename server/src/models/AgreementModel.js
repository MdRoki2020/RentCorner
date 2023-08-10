const mongoose=require('mongoose');
const AgreementSchema=mongoose.Schema({
    UserId:{type:String},
    PropertiesId:{type:String},
    RenterEmail:{type:String},
    AgreementStatus:{type:String},
    createdDate:{type:Date,default:Date.now()}
});
const AgreementModel=mongoose.model('agreement',AgreementSchema);
module.exports=AgreementModel;