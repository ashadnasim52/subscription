import { toast, ToastContainer } from "react-toastify";
import { SOMETHING_WENT_WRONG, TOAST_ERROR, TOAST_SUCCESS } from "./constant";

export const showToast = async (
	message = SOMETHING_WENT_WRONG,
	TYPE = TOAST_ERROR
) => {
	if (TYPE === TOAST_ERROR) {
		return toast.error(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
		});
	}
	if (TYPE === TOAST_SUCCESS) {
		return toast.success(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
		});
	}
};
