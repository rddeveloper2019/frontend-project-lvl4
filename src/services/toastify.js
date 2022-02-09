import { ToastContainer, toast } from 'react-toastify';

export const notify = (msg, type) => {
  const typesMap = {
    success: toast.TYPE.SUCCESS,
    error: toast.TYPE.ERROR,
    warning: toast.TYPE.WARNING,

  };
  const options = {
    type: typesMap[type] || '',
  };

  toast(msg, options);
};

export default ToastContainer;
