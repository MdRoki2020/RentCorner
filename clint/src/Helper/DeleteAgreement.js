import {DeleteAgreement} from "../API Request/APIRequest";
import Swal from 'sweetalert2';

export function DeleteAgreementHistory(id){
    return  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
          return  DeleteAgreement(id).then((deleteResult)=>{
                return deleteResult
            })
        }
    })

}