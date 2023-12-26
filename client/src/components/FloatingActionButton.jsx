import React from "react";

const FloatingActionButton = ({ onClick }) => {
	return (
		<button
			className="fixed bottom-4 right-4 bg-accentcolor text-white px-7 py-5 rounded-full shadow-md"
			onClick={onClick}
		>
			+
		</button>
	);
};

export default FloatingActionButton;
