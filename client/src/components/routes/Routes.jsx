import React from "react";
import Home from "../../pages/Home";
import About from "../../pages/About";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Chat from "../../pages/Chat";
import Admin from "../../pages/Admin";
import AddPlan from "../Plans/AddPlan";

const Navigations = () => {
	return (
		<div>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/chat/:id" element={<Chat />} />

				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />

				<Route path="/about" element={<About />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/add-plan" element={<AddPlan />} />
			</Routes>
		</div>
	);
};

export default Navigations;
