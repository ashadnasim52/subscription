import React, { useEffect, useState } from "react";
import animationData from "../assets/login.json";
import Lottie from "lottie-react";
import { SOMETHING_WENT_WRONG, TOAST_SUCCESS, colors } from "../utils/constant";
import { SIGNUP } from "../utils/api";
import { showToast } from "../utils/funcs";
import { logger } from "../utils/logger";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
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
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userName, setuserName] = useState("");

	function comparePasswords() {
		if (password === confirmPassword) {
			logger.log("Passwords match and meet the pattern.");
			return true;
		} else {
			showToast("Both Password are not same");
			return false;
		}
	}

	const _handleSignUp = async () => {
		try {
			if (!comparePasswords()) return;
			const { data } = await axiosInstance.post(SIGNUP, {
				email,
				password,
				userName,
			});
			if (data?.error) return showToast(data?.message || SOMETHING_WENT_WRONG);
			logger.log({
				data: data,
			});
			showToast(data?.message || "Success", TOAST_SUCCESS);
			nav("/signin");
			return;
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};
	return (
		<div className="flex flex-col lg:flex-row h-100 lg:h-screen bg-darkblackcolor">
			<div className="lg:flex-1 bg-darkblackcolor p-8 flex items-center justify-center">
				<div className="text-white text-center">
					<Lottie animationData={animationData} loop={true} />
					<div className="text-pink text-center">
						<h1 className="text-4xl font-bold mb-4">GenZ Chat App</h1>
						<p>Your go-to platform for chatting with GenZ!</p>
					</div>
				</div>
			</div>

			<div className="lg:flex-1 flex items-center justify-center p-4 lg:p-8">
				<div className="bg-secondarycolor text-white p-4 lg:p-8 rounded-md shadow-md w-full  grid grid-cols-1 gap-4">
					<h2 className="text-2xl font-bold mb-6">Sign Up</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="username"
								className="block text-gray-600 font-semibold mb-2"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={userName}
								onChange={(e) => setuserName(e.target.value)}
								className="w-full border rounded-md py-2 px-3 text-black"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-gray-600 font-semibold mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border rounded-md py-2 px-3 text-black"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div>
							<label
								htmlFor="password"
								className="block text-gray-600 font-semibold mb-2"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border rounded-md py-2 px-3 text-black"
							/>
						</div>
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-gray-600 font-semibold mb-2"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								name="confirmPassword"
								className="w-full border rounded-md py-2 px-3 text-black"
							/>
						</div>
					</div>
					<button
						onClick={_handleSignUp}
						className="bg-accentcolor text-white rounded-md py-2 px-4 w-full"
					>
						Sign Up
					</button>
					<p className="text-white mt-4 ">
						Already have an account?{" "}
						<Link to="/signin" className="underline text-blue-400">
							Sign In
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
