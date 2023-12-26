import { io } from "socket.io-client";
import { TOKEN } from "../utils/constant";

const URL = import.meta.env.VITE_BASE_URL;

export const socket = io(URL, {
	autoConnect: false,
	auth: { token: `${localStorage.getItem(TOKEN)}` }, // Replace with the actual JWT token
});
