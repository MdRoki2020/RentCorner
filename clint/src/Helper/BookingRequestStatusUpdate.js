import Swal from "sweetalert2";
import { UpdateBookingRequestStatusRequest } from "../API Request/APIRequest";

export function UpdateBookingRequestStatusToDO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {Available: 'Available',Booked: 'Booked'},
        inputValue:status,
    }).then((result)=>{
        return UpdateBookingRequestStatusRequest (id, result.value).then((res)=>{
            return res;
        })
    })
}