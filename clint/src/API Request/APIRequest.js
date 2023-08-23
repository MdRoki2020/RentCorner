import Axios from 'axios';
import { setEmail, setOTP, setRenterDetails, setToken } from '../Helper/SessionHelperPublisher';
import { ErrorToast, SuccessToast } from '../Helper/FormHelper';
import { setUserDetails } from '../Helper/SessionHelperUser';
import { ToastErrorToast, ToastSuccessToast } from '../Helper/FormHelper2';

// const AxiosHeader={headers:{"token":getToken()}}
const BaseUrl="http://localhost:8000/api/v1/"


//Create Rooms
// export function PostRoomRequest(data){
    

//     let URL=BaseUrl+"/CreateRooms"


//     return Axios.post(URL,data).then((res)=>{
        
//         if(res.status===200){
//             return true;
//         }else{
//             return false;
//         }
//     }).catch((err)=>{
        
//         console.log(err);
//         return false;
//     })
// }


//Signup Request
export function SignupRequest(data){

    let URL=BaseUrl+"/CreateRenters"


    return Axios.post(URL,data).then((res)=>{
        
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        
        console.log(err);
        return false;
    })
}


//Renters Login
export function RentersLoginRequest(Email,Password){
    let URL=BaseUrl+"/RentersLogin"

    let PostBody={
        Email:Email,
        Password:Password
    }

    return Axios.post(URL,PostBody).then((res)=>{

        if(res.status===200){
            setToken(res.data['token']);
            setRenterDetails(res.data['data']);
            ToastSuccessToast("Login Success")
            return true;
        }
        else{
            ToastErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err)=>{
        console.log("Something Went Wrong");
        return false;
    });

}


//filter product by userEmail
export function FilterRoomByEmail(renterEmail){
    let URL=BaseUrl+"/SpecificRentersRoomList/"+renterEmail;
    return Axios.get(URL).then((res)=>{
        if(res.status===200){
            return {data: res.data['data'], count: res.data['count']};
            
        }else{
            return false;
        }
    }).catch((err)=>{
        return false;
    })
}

//filter Filter District And Category 
export async function FilterDistrictAndCategoryRequest(selectedDistrict, selectedCategory) {
    try {
      const URL = `${BaseUrl}/FilterDistrictAndCategory/${selectedDistrict}/${selectedCategory}`;
      const response = await Axios.get(URL);
  
      if (response.status === 200) {
        return response.data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }



// delete rooms
export function DeleteRoom(id){
    let URL=BaseUrl+"DeleteRooms/"+id;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return true
        }else{
            return false
        }

    }).catch((err)=>{
        console.log(err);
        return false;
    })
}





//status changee..
export function UpdateStatusRequest(id,status){

    let URL=BaseUrl+"UpdateTaskStatus/"+id+"/"+status;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")

        return false;
    });
}


// Agreement status changee..
export function UpdateAgreementStatusRequest(id,status){

    let URL=BaseUrl+"UpdateAgreementStatus/"+id+"/"+status;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")

        return false;
    });
}



//User Registration Request
export function UserRegistrationRequest(data){

    let URL=BaseUrl+"/CreateUsers"


    return Axios.post(URL,data).then((res)=>{
        
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        
        console.log(err);
        return false;
    })
}


//user Login
export function UserLoginRequest(Email,Password){
    let URL=BaseUrl+"/LoginUsers"

    let PostBody={
        Email:Email,
        Password:Password
    }

    return Axios.post(URL,PostBody).then((res)=>{

        if(res.status===200){
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast("Login Success");
            return true;
        }
        else{
            ErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err)=>{
        console.log("Something Went Wrong");
        return false;
    });

}


//Total Price filter by email
export function TotalPriceByEmailRequest(email){
    let URL=BaseUrl+"SumPricesByEmail/"+email;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}



//filter BY Category
export function FilterByCategories(roomCategories, searchTerm) {
    let URL = `${BaseUrl}/FilterByCategories/${roomCategories}/${searchTerm}`;
  
    return Axios.get(URL)
      .then((res) => {
        if (res.status === 200) {
          return res.data['data'];
        } else {
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
  }
  


//READ DATA BY ID
export function  ReadDataById(id){
    let URL=BaseUrl+"/ReadDataById/"+id;

    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}


//create comment request
export function CreateCommentRequest(id,Comments){
    let URL=BaseUrl+"/CreateComment";

    let PostBody={
        PropertiesId:id,
        Comments:Comments,
    }

    return Axios.post(URL,PostBody).then((res)=>{
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}


//reads comments by id
export function ReadCommentsById(id){
    let URL=BaseUrl+"/ReadCommentByPropertiesId/"+id;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}


//related product
export function RelatedProduct(category){
    let URL=BaseUrl+"/RelatedProduct/"+category;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}


export function RequestForBooking(singlePropertiesId,RenterEmail,userName,userEmail,userMobile,userNid,userimageUrl,category,Status){

    let URL=BaseUrl+"/BookingRequest"

    let PostBody={
        propertiesId:singlePropertiesId,
        RenterEmail:RenterEmail,
        userName:userName,
        userEmail:userEmail,
        userMobile:userMobile,
        userNid:userNid,
        userimageUrl:userimageUrl,
        category:category,
        Status:Status,
    }

    return Axios.post(URL,PostBody).then((res)=>{
        
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        
        console.log(err);
        return false;
    })
}

export function RequestForAgreement(userName,userMobile,userEmail,userNid,userImage,propertiesCategory,propertiesName,propertiesNumber,propertiesUnitNumber,propertiesLevelNumber,RenterEmail,AgreementStatus){
    let URL=BaseUrl+"/Agreement"

    let PostBody={
        userName:userName,
        userMobile:userMobile,
        userEmail:userEmail,
        userNid:userNid,
        userImage:userImage,
        propertiesCategory:propertiesCategory,
        propertiesName:propertiesName,
        propertiesNumber:propertiesNumber,
        propertiesUnitNumber:propertiesUnitNumber,
        propertiesLevelNumber:propertiesLevelNumber,
        RenterEmail:RenterEmail,
        AgreementStatus:AgreementStatus,
    }

    return Axios.post(URL,PostBody).then((res)=>{
        
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        
        console.log(err);
        return false;
    })
}

export function RentersPropertiesUpdate(id, houseName, houseNumber, unitNumber, levelNumber, unitPerLevel, features, appartmentPrice, unitPrice, levelPrice, unitRent, singleRoomRent, district, thana, zipCode, address, roadNumber) {
    let URL = BaseUrl + '/UpdateProperties/'+id;  
    let PostBody = {
        HouseName: houseName,
        HouseNumber: houseNumber,
        UnitNumber: unitNumber,
        LevelNumber: levelNumber, 
        UnitsPerLevel: unitPerLevel, 
        Features: features,
        AppartmentPrice: appartmentPrice, 
        UnitPrice: unitPrice, 
        LevelPrice: levelPrice, 
        UnitRentPrice: unitRent, 
        RoomRentPrice: singleRoomRent, 
        District: district, 
        Thana: thana, 
        ZipCode: zipCode, 
        Address: address, 
        RoadNumber: roadNumber,
    };
  
    return Axios.post(URL, PostBody)
      .then((res) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }


  export function ReadBookingRequestByEmail(RenterEmail){
    let URL=BaseUrl+"/ReadBookingRequestByEmail/"+RenterEmail;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}


//Read All Properties List
export function AllBookingRequestList(){
    let URL=BaseUrl+"/AllBookingRequestList";
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data']; 
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}


//added properties love list..
export function AddLoveZoneRequest(userEmail,propertiesId,image,category,HouseName,Status){
    let URL=BaseUrl+"/addedLoveZoneList";

    let PostBody={
        userEmail:userEmail,
        PropertiesId:propertiesId,
        image:image,
        category:category,
        HouseName:HouseName,
        Status:Status,
    }

    return Axios.post(URL,PostBody).then((res)=>{
        
        if(res.status===200){
            return true;
        }else{
            return false;
        }
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

//Read love list filter by email
export function ReadLoveListFilterByEmail (userEmail){
    let URL=BaseUrl+ "/ReadLoveZoneByEmail/"+userEmail;

    return Axios.get(URL).then((res)=>{
        if(res.status===200){
            return res.data['data'];
        }else{
            return false;
        }
    }).catch((err)=>{
        return false;
    })
}

// delete loveList
export function DeleteLoveList(id){
    let URL=BaseUrl+"DeleteLoveList/"+id;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return true
        }else{
            return false
        }

    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

// delete Agreement
export function DeleteAgreement(id){
    let URL=BaseUrl+"DeleteAgreement/"+id;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return true
        }else{
            return false
        }

    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

//Read agreement data..
export function ReadAgreementByEmailRequest(email){
    let URL=BaseUrl+"AgreementHistory/"+email;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data'];
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}
  













//Password Recovery API Request Start........
//sendOTP email..
export function RecoverVerifyEmailRequest(email){
    let URL=BaseUrl+"RecoverVerifyEmail/"+email;

    return Axios.get(URL).then((res)=>{
        if(res.status===200){
            if(res.data['status']==='fail'){
                ErrorToast("No User Found");
                return false;
            }else{
                setEmail(email);
                SuccessToast("A 6 Digit Verification code has been sent to your email address");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong");
        return false;
    });
}


//OTP verify..
export function RecoverVerifyOTPRequest(email,otp){
    let URL=BaseUrl+"RecoverVerifyOTP/"+email+"/"+otp;
    return Axios.get(URL).then((res)=>{
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(otp)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        return false;
    });
}


//password change request
export function RecoverResetPassRequest(email,OTP,password){
    let URL=BaseUrl+"RecoverResetPass/"

    let postBody={email:email,OTP:OTP,password:password}

    return Axios.post(URL,postBody).then((res)=>{
        if(res.status===200){
            if(res.data['status']==='fail'){
                ErrorToast(res.data['data'])
                return false;
            }else{
                setOTP(OTP)
                SuccessToast("New Password Created");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
    });
}

//Password Recovery API Request End........


//Read All ADs filter by email
export function CountBookedRoomByEmailRequest(email){
    let URL=BaseUrl+"CountBookedRoomByEmail/"+email;
    return Axios.get(URL).then((res)=>{

        if(res.status===200){
            return res.data['data']; 
        }else{
            return false
        }

    }).catch((err)=>{
        return false
    })
}












//demo
