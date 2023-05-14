const AllRoomsModel = require("../models/AllRoomsModel");



//count status
exports.CountBookedRoom=async (req,res)=>{
    try{
      const data = await AllRoomsModel.countDocuments({ Status: 'Booked' });
      res.status(200).json({ data });
    }catch{
      res.status(500).json({ error: err.message });
    }
  }
  