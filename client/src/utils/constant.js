export const colors = {
	PRIMARY: "#EEEEEE",
	ACCENT: "#E91E63",
	BLACK: "#111110",
};
export const SOMETHING_WENT_WRONG = "An error occurred. Please try again.";

export const TOAST_ERROR = "TOAST_ERROR";
export const TOAST_SUCCESS = "TOAST_SUCCESS";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
export const TOKEN = "@token";
