const express=require('express');
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const UserControllers=require('../controllers/UserControllers');

const upload = require('../helpers/multer');
const router=express.Router();



router.post('/createRooms', upload.fields([{ name: 'Image', maxCount: 3 }, { name: 'DynamicImage', maxCount: 1 }]), UserControllers.createRooms);


module.exports=router;