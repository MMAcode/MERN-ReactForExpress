import { toast } from 'react-toastify';

const errorToast = localError => {
  // toast(`Error encountered: ${JSON.stringify(localError)}`, {
    toast.error(`Error encountered. Please send a screenshot to the developer on testedPushupPlans@gmail.com Error details: ${JSON.stringify(localError)}`, {
    position: "top-center",
    // autoClose: 7000,
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export const errorFullscreen = localError => {
  // toast(`Error encountered: ${JSON.stringify(localError)}`, {
    toast.error(`Error encountered. Please send a screenshot to the developer on testedPushupPlans@gmail.com Error details: ${JSON.stringify(localError)}`, {
    position: "top-center",
    // autoClose: 7000,
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}


export const normalToast = message => {
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    // autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export default errorToast;