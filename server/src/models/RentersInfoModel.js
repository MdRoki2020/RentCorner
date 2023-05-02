const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Mobile: {
    type: String,
  },
  Email: {
    type: String ,unique:true,
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
  ConformPassword: {
    type: String,
  },
  CreatedDate:{
    type:Date,default:Date.now()
}
});

module.exports = mongoose.model('rentersinfo', productSchema);