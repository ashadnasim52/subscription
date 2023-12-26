import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";
const LoadingComponent = () => {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<Lottie animationData={loadingAnimation} loop={true} />
		</div>
	);
};

export default LoadingComponent;
