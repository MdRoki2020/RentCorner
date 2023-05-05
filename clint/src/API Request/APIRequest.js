import Axios from 'axios';
import { setRenterDetails, setToken } from '../Helper/SessionHelperPublisher';
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



// delete product
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






