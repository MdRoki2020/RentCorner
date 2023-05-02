const express=require('express');
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const RentersControllers=require('../controllers/RentersControllers');
const upload = require('../helpers/multer');
// const uploader = require("../helpers/uploader");
const router=express.Router();


// For Renters
router.post('/CreateRooms', upload.fields([{ name: 'Image', maxCount: 3 }, { name: 'DynamicImage', maxCount: 1 }]),RentersControllers.CreateRooms);
router.post('/UpdateRoom/:id',RentersControllers.UpdateRoom);
router.post('/CreateRenters', upload.single('file'), RentersControllers.CreateRenters);
router.post('/RentersLogin',RentersControllers.RentersLogin);
router.get('/SpecificRentersRoomList/:renterEmail',RentersControllers.SpecificRentersRoomList);




module.exports=router;