import React, { useEffect, useState } from "react";
import animationData from "../assets/login.json";
import Lottie from "lottie-react";
import { SOMETHING_WENT_WRONG, colors } from "../utils/constant";
import { SIGNIN } from "../utils/api";
import { showToast } from "../utils/funcs";
import { logger } from "../utils/logger";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { setSession } from "../utils/jwt";
import { useSelector } from "react-redux";

const SignIn = () => {
	const nav = useNavigate();
	const { isAuthenticated, isLoading, authData } = useSelector(
		(state) => state.global
	);
	useEffect(() => {
		if (isAuthenticated) {
			nav("/");
		}
	}, [isAuthenticated]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const _handleSignIn = async () => {
		try {
			const { data } = await axiosInstance.post(SIGNIN, {
				email,
				password,
			});
			if (data?.error) return showToast(data?.message || SOMETHING_WENT_WRONG);
			logger.log({
				data: data,
			});
			if (data?.token) {
				setSession(data?.token);
				window.location.href = "/";
			}
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};
	return (
		<div className="flex flex-col lg:flex-row h-screen bg-darkblackcolor">
			<div className="lg:flex-1 bg-darkblackcolor p-8 flex items-center justify-center">
				<div className="text-white text-center">
					<Lottie animationData={animationData} loop={true} />
					<div className="text-pink text-center">
						<h1 className="text-4xl font-bold mb-4">GenZ Chat App</h1>
						<p>Your go-to platform for chatting with GenZ!</p>
					</div>
				</div>
			</div>

			<div className="lg:flex-1 flex items-center justify-center p-8">
				<div className="bg-secondarycolor text-white p-8 rounded-md shadow-md w-full lg:w-96">
					<h2 className="text-2xl font-bold mb-6">Sign In</h2>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-600 font-semibold mb-2"
						>
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							name="email"
							className="w-full border rounded-md py-2 px-3 text-black"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-600 font-semibold mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							className="w-full border rounded-md py-2 px-3 text-black"
						/>
					</div>
					<button
						className="bg-accentcolor text-white rounded-md py-2 px-4 w-full"
						onClick={_handleSignIn}
					>
						Sign In
					</button>
					<p className="text-white mt-4 ">
						Don't have an account?{" "}
						<Link to="/signup" className="underline text-blue-400">
							Create one
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
