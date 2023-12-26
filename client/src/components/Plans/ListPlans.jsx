// src/components/ListPlans.js

import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const ListPlans = () => {
	const [plans, setPlans] = useState([]);
	const fetchPlans = async () => {
		try {
			const response = await axiosInstance.get(
				"http://localhost:8000/api/plans"
			);
			setPlans(response.data);
		} catch (error) {
			console.error("Error fetching plans:", error);
		}
	};
	useEffect(() => {
		fetchPlans();
	}, []);

	const handleDelete = async (planId) => {
		try {
			await axiosInstance.delete(`http://localhost:8000/api/plans/${planId}`);
			alert("Plan deleted successfully!");
			// Refresh the list of plans after deletion
			fetchPlans();
		} catch (error) {
			console.error("Error deleting plan:", error);
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">Plans</h2>
			<ul className="list-disc pl-4">
				{plans.map((plan) => (
					<li
						key={plan._id}
						className="mb-4 border-b pb-2 flex justify-between items-center"
					>
						<div>
							<p className="text-lg font-semibold">{plan.planName}</p>
							<p className="text-gray-600">
								{plan.amount} - {plan.description}
							</p>
						</div>
						<button
							className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
							onClick={() => handleDelete(plan._id)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListPlans;
