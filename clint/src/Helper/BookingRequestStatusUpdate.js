import Swal from "sweetalert2";
import { UpdateBookingRequestStatusRequest } from "../API Request/APIRequest";

export function UpdateBookingRequestStatusToDO(id, status) {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: { Available: 'Available', Booked: 'Booked' },
        inputValue: status,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value !== undefined) {
                return UpdateBookingRequestStatusRequest(id, result.value).then((res) => {
                    return res;
                }).catch((error) => {
                    console.error("Error updating booking request status:", error);
                    throw error;
                });
            }
        } else {
            return "Booking request status change cancelled";
        }
    }).catch((error) => {
        console.error("Error in Swal.fire:", error);
        throw error;
    });
}
