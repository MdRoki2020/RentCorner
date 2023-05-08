const express=require('express');
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const RentersControllers=require('../controllers/RentersControllers');
const upload = require('../helpers/multer');


const router=express.Router();


// For Renters
router.post('/CreateRooms', upload.fields([{ name: 'Image', maxCount: 3 }, { name: 'DynamicImage', maxCount: 1 }]),RentersControllers.CreateRooms);
router.post('/UpdateRoom/:id',RentersControllers.UpdateRoom);
router.post('/CreateRenters', upload.single('file'), RentersControllers.CreateRenters);
router.post('/RentersLogin',RentersControllers.RentersLogin);
router.get('/SpecificRentersRoomList/:renterEmail',RentersControllers.SpecificRentersRoomList);
router.get("/UpdateTaskStatus/:id/:status",RentersControllers.UpdateTaskStatus);
router.get("/DeleteRooms/:id",RentersControllers.DeleteRooms);










//for recovery password
router.get("/RecoverVerifyEmail/:email",RentersControllers.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",RentersControllers.RecoverVerifyOTP);
router.post("/RecoverResetPass",RentersControllers.RecoverResetPass);





module.exports=router;