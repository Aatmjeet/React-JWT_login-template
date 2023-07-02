import React, { useContext } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { AppContext } from "./contexts/appContext";

// styling packages
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/defaultLayout"));

// Pages
const Login = React.lazy(() => import("./pages/login"));

function App() {
	const { token } = useContext(AppContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/login"
					name="Login Page"
					element={token ? <RedirectHelper to="/" /> : <Login />}
				/>
				<Route
					path="*"
					element={token ? <DefaultLayout /> : <RedirectHelper to="/login" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export const RedirectHelper = ({ to }) => {
	const prevRoute = useLocation();
	return <Navigate to={to} state={prevRoute} replace />;
};

export default App;
