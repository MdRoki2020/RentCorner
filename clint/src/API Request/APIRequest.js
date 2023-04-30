import Axios from 'axios';

// const AxiosHeader={headers:{"token":getToken()}}
const BaseUrl="http://localhost:8000/api/v1/"


//Create Rooms
export function PostRoomRequest(data){
    

    let URL=BaseUrl+"/CreateRooms"


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