import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(
		window.innerWidth < MOBILE_BREAKPOINT
	);

	const handleResize = () => {
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isMobile;
};

export default useIsMobile;
