import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FormHelper {
  ToastErrorToast(msg) {
    toast.error(msg, { position: 'bottom-center' });
  }

  ToastSuccessToast(msg) {
    toast.success(msg, { position: 'bottom-center' });
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
