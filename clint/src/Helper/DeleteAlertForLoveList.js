import Swal from 'sweetalert2';
import { DeleteLoveList } from '../API Request/APIRequest';

export function DeleteAlertForLoveList(id){
    return  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
          return  DeleteLoveList(id).then((deleteResult)=>{
                return deleteResult
            })
        }
    })

}