import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data && data.errors) {

      setErrors(data.errors);
    } else {
        closeModal()
    }
  };


  const demoUserLogIn = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-container">
      <h1 className="new-h1">Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
        Email
          <input
            className="placeholder"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="Email"
          />
        </label>
        <label className="login-label">
        Password
          <input
            className="placeholder"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder="Password"
          />
        </label>
        <span className="login-errors">{Object.values(errors).length ? 'invalid login credentials': ''}</span>
        <button className = 'login-button' type="submit">Log In</button>
        <button className="demoUserLink" onClick={demoUserLogIn}>Demo User</button>
            {/* <ul className="errors-ul">
              {Object.values(errors).map((error, idx=0) => (
                <li key={idx+1}>{error}</li>
              ))}
            </ul> */}
      </form>
    </div>
  );
}



export default LoginFormModal;
