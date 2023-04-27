const express=require('express');
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const RentersControllers=require('../controllers/RentersControllers');
const upload = require('../helpers/multer');
const router=express.Router();


// For User
router.post('/CreateRooms', upload.fields([{ name: 'Image', maxCount: 3 }, { name: 'DynamicImage', maxCount: 1 }]),RentersControllers.CreateRooms);
router.post('/UpdateRoom/:id',RentersControllers.UpdateRoom);

module.exports=router;