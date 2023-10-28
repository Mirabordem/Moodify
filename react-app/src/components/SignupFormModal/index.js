import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [errors, setErrors] = useState([]);
	const [validationObject, setValidationObject] = useState({});
	const { closeModal } = useModal();
	const [errors, setErrors] = useState({})


	const handleSubmit = async (e) => {
		e.preventDefault();

		const errorsObj = {};

		if (!email) {
			errorsObj.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errorsObj.email = "Invalid email format";
		}

		if (!username) {
			errorsObj.username = "Username is required";
		} else if (username.length < 3) {
			errorsObj.username = "Username must be min 3 characters";
		}

		if (!password) {
			errorsObj.password = "Password is required";
		} else if (password.length < 6) {
			errorsObj.password = "Password must be min 6 characters";
		}

		if (!confirmPassword) {
			errorsObj.confirmPassword = "Please confirm your password";
		} else if (password !== confirmPassword) {
			errorsObj.confirmPassword = "Confirm Password field must be the same as the Password field";
		}
		setValidationObject(errorsObj);


		if (Object.keys(errorsObj).length > 0) {
			return;
		}
		const data = await dispatch(signUp(username, email, password));
		if (data && data.errors) {
			setValidationObject(data.errors);
		} else {
			closeModal();
		}
	};

	return (
		<div className="signup-container">
			<div className="new-h1">Sign up</div>
			<form onSubmit={handleSubmit} className="signup-form">
				<label className="login-label">
					{validationObject.email && <span className="signup-error">{validationObject.email}</span>}
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						// placeholder="Email"
					/>
				</label>
				<label className="login-label">
					{validationObject.username && <span className="signup-error">{validationObject.username}</span>}
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						// placeholder="Username"
					/>
				</label>
				<label className="login-label">
					{validationObject.password && <span className="signup-error">{validationObject.password}</span>}
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						// placeholder="Password"
					/>
				</label>
				<label className="login-label">
					{validationObject.confirmPassword && (<span className="signup-error">{validationObject.confirmPassword}</span>)}
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						// placeholder="Confirm Password"
					/>
				</label>
				<button className="signup-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}







// 		if (password === confirmPassword) {
// 			const data = await dispatch(signUp(username, email, password));
// 			if (data) {
// 				setErrors(data);
// 			} else {
// 				closeModal();
// 			}
// 		} else {
// 			setErrors([
// 				"Confirm Password field must be the same as the Password field",
// 			]);
// 		}
// 	};

// 	return (
// 		<>
// 			<h1>Sign Up</h1>
// 			<form onSubmit={handleSubmit}>
// 				<ul>
// 					{errors.map((error, idx) => (
// 						<li key={idx}>{error}</li>
// 					))}
// 				</ul>
// 				<label>
// 					Email
// 					</label>
// 					<input
// 						type="text"
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 					/>

// 				<label>
// 					Username
// 					<input
// 						type="text"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Password
// 					<input
// 						type="password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<label>
// 					Confirm Password
// 					<input
// 						type="password"
// 						value={confirmPassword}
// 						onChange={(e) => setConfirmPassword(e.target.value)}
// 						required
// 					/>
// 				</label>
// 				<button type="submit">Sign Up</button>
// 			</form>
// 		</>
// 	);
// }

export default SignupFormModal;
