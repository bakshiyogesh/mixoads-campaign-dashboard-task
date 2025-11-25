import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.dismiss();
  toast.success(message, {
    position: "top-right",
    duration: 2000,
  });
};

export const showErrorToast = (message: string) => {
  toast.dismiss();
  toast.error(message, {
    position: "top-right",
    duration: 2000,
  });
};

export const ShowLoadingToast = (message: string) => {
  toast.dismiss();
  toast.loading(message, {
    position: "top-right",
    duration: 2000,
  });
};

export const ShowLoaderToast = (message: string) => {
  toast.dismiss();
  // toast.promise(message,{})
};
