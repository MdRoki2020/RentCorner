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
router.get('/PlaceGetById/:id',RentersControllers.PlaceGetById);
router.post('/CreateRenters', upload.single('file'), RentersControllers.CreateRenters);
router.post('/RentersLogin',RentersControllers.RentersLogin);
router.get('/SpecificRentersRoomList/:renterEmail',RentersControllers.SpecificRentersRoomList);
router.get("/UpdateTaskStatus/:id/:status",RentersControllers.UpdateTaskStatus);
router.get("/DeleteRooms/:id",RentersControllers.DeleteRooms);
router.get("/CountBookedRoomByEmail/:email",RentersControllers.CountBookedRoomByEmail);
router.get("/SumPricesByEmail/:email",RentersControllers.SumPricesByEmail);
router.post("/UpdateProperties/:id", RentersControllers.UpdateProperties);
router.get("/ReadBookingRequestByEmail/:email", RentersControllers.ReadBookingRequestByEmail);
router.get("/PropertiesLevelChart/:email",RentersControllers.PropertiesLevelChart);
router.get("/statusPercentage/:email",RentersControllers.getRoomStatusPercentage);
router.post('/sendEmailToUser', RentersControllers.sendEmailToUser);
router.post('/Agreement', RentersControllers.AgreementRequest);
router.get('/AgreementHistory/:email', RentersControllers.AgreementHistory);
router.get('/DeleteAgreement/:id', RentersControllers.DeleteAgreement);
router.get("/UpdateAgreementStatus/:id/:status",RentersControllers.UpdateAgreementStatus);
router.post("/UpdateRenterProfile/:email",RentersControllers.RenterUpdateProfile);
router.get("/ReadRenterDetails/:email", RentersControllers.ReadRenterDetails);
router.get("/ReadPublisherData/", RentersControllers.ReadPublisherData);





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
router.post("/BookingRequest",UsersControllers.BookingRequest);
router.get("/AllPropertiesList",UsersControllers.AllPropertiesList); //ekhane middleware add kora jabe na, bcz eta user site and renter site contain korbe
router.post("/addedLoveZoneList",UsersControllers.CreateLoveZoneList);
router.get("/ReadLoveZoneByEmail/:userEmail",UsersControllers.ReadLoveZonePropertiesByEmail);
router.get("/DeleteLoveList/:id",UsersControllers.DeleteLoveList);
router.get('/searchByPriceAndSearch', UsersControllers.searchByPriceAndSearch);
router.get('/FilterDistrictAndCategory/:selectedDistrict/:selectedCategory', UsersControllers.FilterDistrictAndCategory);
router.get('/ReadAgreementData', UsersControllers.ReadAgreementData);
router.get('/ReadAllProperties', UsersControllers.ReadAllProperties);
router.get('/ReadAllUser', UsersControllers.ReadAllUser);

//for recovery password
router.get("/RecoverVerifyEmail/:email",RentersControllers.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",RentersControllers.RecoverVerifyOTP);
router.post("/RecoverResetPass",RentersControllers.RecoverResetPass);





module.exports=router;