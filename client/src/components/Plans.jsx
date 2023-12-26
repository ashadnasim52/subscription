import React from "react";
import Plan from "./Plan";

const Plans = ({ plans }) => {
	return (
		<div
			className="overflow-y-auto  bg-darkblackcolor text-white p-4 m-0 rounded-md shadow-md mb-4 w-full "
			style={{
				minHeight: "80vh",
			}}
		>
			<h2 className="text-xl font-bold mb-2 text-center p-2">
				Purchase Any Plan
			</h2>
			<div
			// className="overflow-y-auto "
			// style={{
			// 	height: "90%",
			// }}
			>
				{plans.map((plan) => (
					<Plan key={plan?._id} plan={plan} />
				))}
			</div>

			{/* <button className="bg-white text-black rounded-md py-2 px-4 w-full absolute bottom-0 left-0 right-0">
				Create New Plan
			</button> */}
		</div>
	);
};

export default Plans;
