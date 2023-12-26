// src/components/AddPlan.js

import React, { useState } from "react";
import axios from "axios";

const AddPlan = () => {
	const [newPlan, setNewPlan] = useState({
		name: "",
		amount: 0,
		description: "",
		planId: "",
		interval: "monthly", // Set a default value or adjust as needed
	});

	const handleChange = (e) => {
		setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Include the interval field in the payload
			const payload = {
				planId: newPlan.planId,
				planName: newPlan.name,
				amount: newPlan.amount,
				description: newPlan.description,
				interval: newPlan.interval,
				// Include any other fields you need to send
			};

			await axios.post("http://localhost:8000/api/plans", payload);
			alert("Plan added successfully!");
			setNewPlan({
				planId: "",
				name: "",
				amount: 0,
				description: "",
				interval: "monthly",
			});
		} catch (error) {
			console.error("Error adding plan:", error);
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">Add Plan</h2>
			<form
				onSubmit={handleSubmit}
				className="bg-gray-200 p-4 rounded-lg shadow-md"
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						planId:
					</label>
					<input
						type="text"
						name="planId"
						value={newPlan.planId}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name:
					</label>
					<input
						type="text"
						name="name"
						value={newPlan.name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Amount:
					</label>
					<input
						type="number"
						name="amount"
						value={newPlan.amount}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Description:
					</label>
					<input
						type="text"
						name="description"
						value={newPlan.description}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Interval:
					</label>
					<select
						name="interval"
						value={newPlan.interval}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
						<option value="yearly">Yearly</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
				>
					Add Plan
				</button>
			</form>
		</div>
	);
};

export default AddPlan;
