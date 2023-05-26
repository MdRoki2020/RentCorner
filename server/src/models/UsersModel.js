const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Mobile: {
    type: String,
  },
  Email: {
    type: String ,unique:true,
  },
  Nid: {
    type: String
  },
  imageUrl: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  Password: {
    type: String,
  },
  CreatedDate:{
    type:Date,default:Date.now()
}
});

module.exports = mongoose.model('users', usersSchema);