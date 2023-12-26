import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div className="bg-secondarycolor relative">
			<Header />
			<div
				style={{
					marginTop: "7vh",
					height: "92vh",
				}}
				// className="min-h-screen"
			>
				{children}
			</div>
		</div>
	);
};

export default Layout;
