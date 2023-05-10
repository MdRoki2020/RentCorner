import Axios from 'axios';
import { setEmail, setOTP, setRenterDetails, setToken } from '../Helper/SessionHelperPublisher';
import { ErrorToast, SuccessToast } from '../Helper/FormHelper';

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
            SuccessToast("Login Success")
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






