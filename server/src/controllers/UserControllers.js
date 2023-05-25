const AllRoomsModel = require('../models/AllRoomsModel');


//user login
//For Admin Registration
exports.CreateRenters = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file attached" });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'RENT_CORNER/RentersPhoto',
        public_id: uuidv4()
      });
  
      const room = new RentersInfoModel({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Mobile: req.body.Mobile,
        Email: req.body.Email,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
        Password: req.body.Password,
        ConformPassword: req.body.ConformPassword
      });
      const data = await room.save();
      res.status(200).json({ status: "success", data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  
  
  //Admin Login
  exports.RentersLogin = (req, res) => {
    const reqBody = req.body;
    RentersInfoModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 0, Email: 1, imageUrl: 1, FirstName: 1 } }
    ])
      .then((data) => {
        if (data.length > 0) {
          const payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0]["Email"]
          };
          const token = jwt.sign(payload, "Secretkey123456789");
          res.status(200).json({ status: "success", token: token, data: data[0] });
        } else {
          res.status(401).json({ status: "unauthorized" });
        }
      })
      .catch((err) => {
        res.status(400).json({ status: "fail", data: err });
      });
  };
  