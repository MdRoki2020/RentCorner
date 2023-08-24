const mongoose=require('mongoose');
const AgreementSchema=mongoose.Schema({
    userName:{type:String},
    userMobile:{type:String},
    userEmail:{type:String},
    userNid:{type:String},
    userImage:{type:String},
    propertiesCategory:{type:String},
    propertiesName:{type:String},
    propertiesNumber:{type:String},
    propertiesUnitNumber:{type:String},
    propertiesLevelNumber:{type:String},
    RenterEmail:{type:String},
    AgreementStatus:{type:String},
    createdDate:{type:Date,default:Date.now()}
});
const AgreementModel=mongoose.model('agreement',AgreementSchema);
module.exports=AgreementModel;