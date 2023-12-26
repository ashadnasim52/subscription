import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils/axios";
import { CHANGE_PLAN, PAYMENT_SUCCESS, SUBSCRIBE } from "../utils/api";
import { Provider, useDispatch, useSelector } from "react-redux";

const Plan = ({ plan }) => {
	const [loading, setLoading] = useState(false);
	const { subscribtion } = useSelector((state) => state.global);

	const handleSubscribe = async () => {
		setLoading(true);

		try {
			// Make an API call to your server to initiate the subscription
			const response = await axiosInstance.post(SUBSCRIBE, {
				planId: plan._id,
				// Add any other necessary data
			});

			// Initialize Razorpay subscription
			const { subscriptionId, orderId, razorpayApiKey } = response.data;

			const options = {
				key: razorpayApiKey,
				subscription_id: subscriptionId,
				name: "Your Company",
				description: `Subscription for ${plan.name}`,
				handler: async function (response) {
					console.log({ response });
					// Handle success
					console.log("Subscription successful!", response);
					const res = await axiosInstance.post(PAYMENT_SUCCESS, {
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
						razorpay_subscription_id: response.razorpay_subscription_id,
					});
					console.log({ res });
				},
				prefill: {
					name: "User Name",
					email: "user@example.com",
					contact: "user_contact_number",
				},
			};

			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			console.error("Error subscribing to plan:", error);
		}

		setLoading(false);
	};
	const handleChangePlan = async () => {
		setLoading(true);

		try {
			// Make an API call to your server to initiate the subscription
			const response = await axiosInstance.post(CHANGE_PLAN, {
				planId: plan._id,
				// Add any other necessary data
			});

			// Initialize Razorpay subscription
			const { subscriptionId, orderId, razorpayApiKey } = response.data;

			const options = {
				key: razorpayApiKey,
				subscription_id: subscriptionId,
				name: "Your Company",
				description: `Subscription for ${plan.name}`,
				handler: async function (response) {
					console.log({ response });
					// Handle success
					console.log("Subscription successful!", response);
					const res = await axiosInstance.post(PAYMENT_SUCCESS, {
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
						razorpay_subscription_id: response.razorpay_subscription_id,
					});
					console.log({ res });
				},
				prefill: {
					name: "User Name",
					email: "user@example.com",
					contact: "user_contact_number",
				},
			};

			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			console.error("Error subscribing to plan:", error);
		}

		setLoading(false);
	};

	return (
		<div className="bg-black text-white px-5 rounded-md shadow-md mb-4 w-full p-2">
			<h2 className="text-xl font-bold mb-2 text-accentcolor">
				{subscribtion?.planRazorpayId === plan?.planId ? "Active" : null}{" "}
				{plan?.planName}
			</h2>
			<div className="flex items-center justify-between">
				<p className="text-sm">{`Price: Rs ${plan?.amount}`}</p>
				<p className="text-sm">{`${plan?.description}`}</p>
				{subscribtion?.active ? (
					<button
						className={`bg-blue-500 text-white p-2 rounded ${
							loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
						}`}
						onClick={handleChangePlan}
						disabled={loading}
					>
						{loading ? "Subscribing..." : "Change Plan"}
					</button>
				) : (
					<button
						className={`bg-blue-500 text-white p-2 rounded ${
							loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
						}`}
						onClick={handleSubscribe}
						disabled={loading}
					>
						{loading ? "Subscribing..." : "Subscribe"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Plan;
