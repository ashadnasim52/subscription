// src/pages/Admin.js

import React from "react";
import { Link } from "react-router-dom";
import ListPlans from "../components/Plans/ListPlans";
import ListUsers from "../components/Plans/ListUsers";
import { Provider, useDispatch, useSelector } from "react-redux";

const Admin = () => {
	const { authData } = useSelector((state) => state.global);
	if (!authData?.isAdmin) return null;
	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Admin Dashboard</h2>
				<Link
					to="/add-plan"
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
				>
					Add Plan
				</Link>
			</div>
			<ListPlans />
			<ListUsers />
		</div>
	);
};

export default Admin;
