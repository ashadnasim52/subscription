import React, { useEffect, useState } from "react";
import animationData from "../assets/walk.json";
import Lottie from "lottie-react";
import { SOMETHING_WENT_WRONG, TOAST_SUCCESS, colors } from "../utils/constant";
import Layout from "../components/Layout";
import Plans from "../components/Plans";
import FloatingActionButton from "../components/FloatingActionButton";
import { ALL_PLANS, CANCEL_PLAN, CREATE_GROUP } from "../utils/api";
import axiosInstance from "../utils/axios";
import { logger } from "../utils/logger";
import { showToast } from "../utils/funcs";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import { Provider, useDispatch, useSelector } from "react-redux";

const Home = () => {
	const { subscribtion } = useSelector((state) => state.global);

	const [plans, setPlans] = useState([]);
	const style = {
		height: 500,
	};

	const _getAllPlans = async () => {
		try {
			const { data } = await axiosInstance.get(ALL_PLANS);
			logger.log({
				data: data,
			});
			setPlans(data?.payload);
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};

	useEffect(() => {
		_getAllPlans();
	}, []);

	const handleCancelPlan = async () => {
		try {
			// Make an API call to your server to initiate the subscription
			const response = await axiosInstance.post(CANCEL_PLAN, {
				// Add any other necessary data
			});

			alert("Plan Cancelled");
		} catch (error) {
			console.error("Error subscribing to plan:", error);
		}
	};

	// const _handleAddGroupClick = async () => {
	// 	const { value: groupName } = await Swal.fire({
	// 		title: "Provide Group Name",
	// 		input: "text",
	// 		inputLabel: "Your new group name",
	// 		inputPlaceholder: "example:- XYX",
	// 	});
	// 	if (groupName) {
	// 		_createGroup(groupName);
	// 	}
	// };

	// const _createGroup = async (groupName) => {
	// 	try {
	// 		const { data } = await axiosInstance.post(CREATE_GROUP, {
	// 			name: groupName,
	// 		});
	// 		if (data?.error) return showToast(data?.message || SOMETHING_WENT_WRONG);
	// 		logger.log({
	// 			data: data,
	// 		});
	// 		showToast(data?.message || "Success", TOAST_SUCCESS);
	// 		_getAllPlans();
	// 	} catch (error) {
	// 		console.log({ error });
	// 		showToast(error?.response?.message || SOMETHING_WENT_WRONG);
	// 	}
	// };

	return (
		<Layout>
			{subscribtion?.active ? (
				<div className="bg-secondarycolor text-white border rounded-md p-4 shadow-md">
					<h1 className="text-xl font-bold mb-4">
						Active Subscription Details
					</h1>
					<div className="mb-2">
						<p className="text-sm font-semibold">Active Subscription Id:</p>
						<p className="text-lg">{subscribtion?.subscriptionId}</p>
					</div>
					<div className="mb-2">
						<p className="text-sm font-semibold">Active Plan Id:</p>
						<p className="text-lg">{subscribtion?.planId}</p>
					</div>
					<button
						onClick={handleCancelPlan}
						className="button bg-red-800 text-white rounded px-10 py-2"
					>
						Cancel Plan
					</button>
				</div>
			) : null}

			<div className="flex flex-col lg:flex-row bg-secondarycolor h-full">
				<div className="lg:flex-1">
					<div className="p-4">
						<Plans plans={plans} />
					</div>
				</div>

				{/* <div className="lg:flex-1 bg-secondarycolor p-8 flex items-center justify-center">
					<div className="text-white text-center">
						<Lottie
							animationData={animationData}
							loop={true}
							style={style}
							// interactivity={interactivity}
						/>
					</div>
				</div> */}
			</div>

			{/* <FloatingActionButton onClick={_handleAddGroupClick} /> */}
		</Layout>
	);
};

export default Home;
