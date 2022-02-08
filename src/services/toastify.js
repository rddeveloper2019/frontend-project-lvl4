import { ToastContainer, toast } from 'react-toastify';

export const notify = (msg, type) => {
  console.log('***toast msg***: ', msg);
  const typesMap = {
    success: toast.TYPE.SUCCESS,
    error: toast.TYPE.ERROR,

  };
  const options = {
    type: typesMap[type] || '',
  };

  toast(msg, options);
};

export default ToastContainer;
