import { useState } from "react";

export default function useTokenTime() {
	const getTokenTime = () => {
		const tokenTimeString = localStorage.getItem("tokenTime");
		return JSON.parse(tokenTimeString);
	};

	const [tokenTime, setTokenTime] = useState(getTokenTime());

	const saveTokenTime = (userTokenTime) => {
		localStorage.setItem("tokenTime", JSON.stringify(userTokenTime));
		setTokenTime(userTokenTime);
	};

	return {
		setTokenTime: saveTokenTime,
		tokenTime,
	};
}
