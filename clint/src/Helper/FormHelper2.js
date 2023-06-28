import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FormHelper {
  ToastErrorToast(msg) {
    toast.error(msg, { position: 'bottom-right' });
  }

  ToastSuccessToast(msg) {
    toast.success(msg, { position: 'bottom-right' });
  }

  ToastIsEmpty(msg){
    return msg.length === 0;
}
}

export const {
  ToastErrorToast,
  ToastSuccessToast,
  ToastIsEmpty
} = new FormHelper();
