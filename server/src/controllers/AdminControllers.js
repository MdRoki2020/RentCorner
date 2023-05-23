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




//Booked status Price
exports.BookedStatusPrice = (req, res) => {
  AllRoomsModel.aggregate([
    { $match: { Status: "Booked" } },
    {
      $group: {
        _id: null,
        totalAppartmentPrice: { $sum: { $toDouble: "$AppartmentPrice" } },
        totalUnitPrice: { $sum: { $toDouble: "$UnitPrice" } },
        totalLevelPrice: { $sum: { $toDouble: "$LevelPrice" } },
        totalUnitRentPrice: { $sum: { $toDouble: "$UnitRentPrice" } },
        totalRoomRentPrice: { $sum: { $toDouble: "$RoomRentPrice" } }
      }
    },
    {
      $project: {
        _id: 0,
        totalAppartmentPrice: { $ifNull: ["$totalAppartmentPrice", 0] },
        totalUnitPrice: { $ifNull: ["$totalUnitPrice", 0] },
        totalLevelPrice: { $ifNull: ["$totalLevelPrice", 0] },
        totalUnitRentPrice: { $ifNull: ["$totalUnitRentPrice", 0] },
        totalRoomRentPrice: { $ifNull: ["$totalRoomRentPrice", 0] },
        totalSum: {
          $add: [
            { $ifNull: ["$totalAppartmentPrice", 0] },
            { $ifNull: ["$totalUnitPrice", 0] },
            { $ifNull: ["$totalLevelPrice", 0] },
            { $ifNull: ["$totalUnitRentPrice", 0] },
            { $ifNull: ["$totalRoomRentPrice", 0] }
          ]
        }
      }
    }
  ])
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ status: "success", data: result[0] });
      } else {
        res.status(200).json({ status: "success", data: { totalSum: 0 } });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "fail", data: err });
    });
};

  