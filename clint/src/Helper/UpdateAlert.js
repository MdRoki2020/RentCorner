import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../API Request/APIRequest";

export function UpdateToDO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {Available: 'Available',Booked: 'Booked'},
        inputValue:status,
    }).then((result)=>{
        return UpdateStatusRequest (id, result.value).then((res)=>{
            return res;
        })
    })
}