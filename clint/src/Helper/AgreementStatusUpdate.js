import Swal from "sweetalert2";
import { UpdateAgreementStatusRequest } from "../API Request/APIRequest";

export function UpdateAgreementStatusToDO(id, status) {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: { confirm: 'confirm', cancel: 'cancel' },
        inputValue: status,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value !== undefined) {
                return UpdateAgreementStatusRequest(id, result.value).then((res) => {
                    return res;
                }).catch((error) => {
                    console.error("Error updating Agreement request status:", error);
                    throw error;
                });
            }
        } else {
            return "Agreement request status change cancelled";
        }
    }).catch((error) => {
        console.error("Error in Swal.fire:", error);
        throw error;
    });
}
