const mongoose=require('mongoose');
const CommentSchema=mongoose.Schema({
    PropertiesId:{type:String},
    Comments:{type:String},
    createdDate:{type:Date,default:Date.now()}
});
const CommentModel=mongoose.model('comments',CommentSchema);
module.exports=CommentModel;