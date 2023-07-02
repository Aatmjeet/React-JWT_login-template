import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBCard,
	MDBCardBody,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBBtn,
	MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

const LoginComponent = () => {
	// State variables
	const [errorMessage, setErrorMessage] = useState("");
	const [justifyActive, setJustifyActive] = useState("login");

	const [loginFormData, setLoginFormData] = useState({
		username: "",
		password: "",
	});

	const [registerFormData, setRegisterFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
	});

	// methods
	const updateLoginData = (key, value) => {
		setLoginFormData((prevState) => {
			let updated_obj = Object.assign({}, prevState);
			updated_obj[key] = value;
			return updated_obj;
		});
	};
	const updateRegisterData = (key, value) => {
		setRegisterFormData((prevState) => {
			let updated_obj = Object.assign({}, prevState);
			updated_obj[key] = value;
			return updated_obj;
		});
	};
	const handleJustifyClick = (value) => {
		if (value === justifyActive) {
			return;
		}

		setJustifyActive(value);
	};
	const Login = () => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/account/admin/login/`,
				loginFormData
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	// useEffect section
	useEffect(() => {
		setErrorMessage("");
	}, [justifyActive]);

	return (
		<MDBContainer fluid>
			<MDBRow className="d-flex flex-wrap justify-content-center align-items-center h-100">
				<MDBCol col="12">
					<MDBCard
						className="bg-white my-5 mx-auto"
						style={{ borderRadius: "1rem", maxWidth: "500px" }}
					>
						<MDBCardBody className="p-5 w-100 d-flex flex-column">
							<MDBTabs
								pills
								justify
								className="mb-6 d-flex flex-row justify-content-between"
							>
								<MDBTabsItem>
									<MDBTabsLink
										onClick={() => handleJustifyClick("login")}
										active={justifyActive === "login"}
									>
										Login
									</MDBTabsLink>
								</MDBTabsItem>
								<MDBTabsItem>
									<MDBTabsLink
										onClick={() => handleJustifyClick("register")}
										active={justifyActive === "register"}
									>
										Register
									</MDBTabsLink>
								</MDBTabsItem>
							</MDBTabs>

							<MDBTabsContent>
								<MDBTabsPane show={justifyActive === "login"}>
									<MDBInput
										wrapperClass="mb-4"
										label="Username"
										value={loginFormData.username}
										onChange={(e) => {
											updateLoginData("username", e.target.value);
										}}
										type="text"
									/>
									<MDBInput
										wrapperClass="mb-4"
										label="Password"
										value={loginFormData.password}
										onChange={(e) => {
											updateLoginData("password", e.target.value);
										}}
										type="password"
									/>

									<div className="text-center text-dangerm mb-4">
										{errorMessage}
									</div>

									<MDBBtn className="mb-4 w-100" onClick={Login}>
										Sign in
									</MDBBtn>
									<div className="d-flex justify-content-center">
										Not a member?&nbsp;
										<div
											onClick={() => {
												setJustifyActive("register");
											}}
											style={{ cursor: "pointer", color: "rgb(59, 113, 202)" }}
										>
											Register
										</div>
									</div>
								</MDBTabsPane>

								<MDBTabsPane show={justifyActive === "register"}>
									<MDBInput
										wrapperClass="mb-4"
										label="First name"
										value={registerFormData.first_name}
										onChange={(e) => {
											updateRegisterData("first_name", e.target.value);
										}}
										type="text"
									/>
									<MDBInput
										wrapperClass="mb-4"
										label="Last name"
										value={registerFormData.last_name}
										onChange={(e) => {
											updateRegisterData("last_name", e.target.value);
										}}
										type="text"
									/>
									<MDBInput
										wrapperClass="mb-4"
										value={registerFormData.username}
										label="Username"
										onChange={(e) => {
											updateRegisterData("username", e.target.value);
										}}
										type="text"
									/>
									<MDBInput
										wrapperClass="mb-4"
										value={registerFormData.email}
										label="Email"
										onChange={(e) => {
											updateRegisterData("email", e.target.value);
										}}
										type="email"
									/>
									<MDBInput
										wrapperClass="mb-4"
										value={registerFormData.password}
										label="Password"
										onChange={(e) => {
											updateRegisterData("password", e.target.value);
										}}
										type="password"
									/>

									<div className="text-center text-danger mb-4">
										{errorMessage}
									</div>

									<MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
									<div className="d-flex justify-content-center">
										Already a member?&nbsp;
										<div
											onClick={() => {
												setJustifyActive("login");
											}}
											style={{ cursor: "pointer", color: "rgb(59, 113, 202)" }}
										>
											Login
										</div>
									</div>
								</MDBTabsPane>
							</MDBTabsContent>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default LoginComponent;
