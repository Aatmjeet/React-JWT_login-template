import axios from "axios";
import { ClearAppToken } from "../contexts/appContext";

const RefreshToken = (token, setToken, setTokenTime) => {
	axios
		.post(
			`${process.env.REACT_APP_API_URL}/auth/refresh`,
			{ refresh: token.refresh },
			{
				headers: {},
			}
		)
		.then((response) => {
			setToken(response.data.data);
		})
		.catch((error) => {
			ClearAppToken(setToken, setTokenTime);
		});
};

export default RefreshToken;
