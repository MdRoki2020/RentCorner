import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../API Request/APIRequest";

export function UpdateToDO(id, status) {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: { Available: 'Available', Booked: 'Booked' },
        inputValue: status,
        showCancelButton: true,  // Show a cancel button
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value !== undefined) {
                return UpdateStatusRequest(id, result.value).then((res) => {
                    return res;
                }).catch((error) => {
                    console.error("Error updating status:", error);
                    throw error;
                });
            }
        } else {
            return "Status change cancelled";
        }
    }).catch((error) => {
        console.error("Error in Swal.fire:", error);
        throw error;
    });
}


