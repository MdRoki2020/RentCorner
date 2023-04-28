import Axios from 'axios';
//Create Rooms
export function PostRoomRequest(data){
    

    let URL="http://localhost:5000/api/v1/CreateRooms"


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