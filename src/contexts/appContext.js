import React, { createContext, useEffect } from "react";
import useToken from "../hooks/useToken";
import RefreshToken from "../methods/refresh_token";
import useTokenTime from "../hooks/useTokenTime";

export const ClearAppToken = (setToken, setTokenTime) => {
	setToken(null);
	setTokenTime("");
	localStorage.removeItem("tokenTime");
	localStorage.removeItem("token");
};

export function AppProvider({ children }) {
	// external hooks
	const { token, setToken } = useToken();
	const { tokenTime, setTokenTime } = useTokenTime();
	// Auto update token
	const checkTokenTime = () => {
		const TimeDiff =
			(new Date().getTime() - new Date(tokenTime).getTime()) /
			(1000 * 3600 * 24);
		if (TimeDiff > 14) {
			RefreshToken(token, setToken, setTokenTime);
		}
	};

	// doing all the first time checks
	useEffect(() => {
		if (!!!token) return;
		if (!!!tokenTime) {
			ClearAppToken(setToken, setTokenTime);
			return;
		}
		checkTokenTime();
	}, []);

	return (
		<AppContext.Provider
			value={{
				token,
				setToken,
				tokenTime,
				setTokenTime,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const AppContext = createContext();
