const express=require('express');
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const RentersControllers=require('../controllers/RentersControllers');
const AdminControllers=require('../controllers/AdminControllers');
const UsersControllers=require('../controllers/UserControllers');
const upload = require('../helpers/multer');


const router=express.Router();


// For Renters
router.post('/CreateRooms', upload.fields([{ name: 'Image', maxCount: 3 }, { name: 'DynamicImage', maxCount: 1 }]),RentersControllers.CreateRooms);
router.post('/UpdateLocation/',RentersControllers.UpdateLocation);
router.get('/PlaceGet',RentersControllers.PlaceGet);
router.post('/CreateRenters', upload.single('file'), RentersControllers.CreateRenters);
router.post('/RentersLogin',RentersControllers.RentersLogin);
router.get('/SpecificRentersRoomList/:renterEmail',RentersControllers.SpecificRentersRoomList);
router.get("/UpdateTaskStatus/:id/:status",RentersControllers.UpdateTaskStatus);
router.get("/DeleteRooms/:id",RentersControllers.DeleteRooms);
router.get("/CountBookedRoomByEmail/:email",RentersControllers.CountBookedRoomByEmail);
router.get("/SumPricesByEmail/:email",RentersControllers.SumPricesByEmail);




//For Admin
router.get("/CountBookedRoom",AdminControllers.CountBookedRoom);
router.get("/BookedStatusPrice",AdminControllers.BookedStatusPrice);




//for user
router.post("/CreateUsers",upload.single('file'),UsersControllers.CreateUser);
router.post("/LoginUsers",UsersControllers.LoginUser);
router.get("/FilterByCategories/:categories/:search?", UsersControllers.FilterByCategories);
router.get("/ReadDataById/:id",UsersControllers.ReadDataById);
router.post("/CreateComment",UsersControllers.CreateComment);
router.get("/ReadCommentByPropertiesId/:PropertiesId",UsersControllers.ReadCommentByPropertiesId);
router.get("/RelatedProduct/:category",UsersControllers.RelatedProductByCategory);




//for recovery password
router.get("/RecoverVerifyEmail/:email",RentersControllers.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",RentersControllers.RecoverVerifyOTP);
router.post("/RecoverResetPass",RentersControllers.RecoverResetPass);





module.exports=router;