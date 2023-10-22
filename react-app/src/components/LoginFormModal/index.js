import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };


  return (
    <div className="login-container">
      <h1 className="h1">Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label >
          Email
          <input
            className="placeholder"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label >
          Password
          <input
            className="placeholder"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <button className = 'login-button' type="submit">Log In</button>
        <button className="demoUserLink" >Demo User</button>
            <ul className="errors-ul">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
      </form>
    </div>
  );
}





//   return (
//     <div className='login-container'>
//       <h1>Log In</h1>
//       <form className='form' onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li className='err-login' key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label className='login-label'>
//           Email
//           </label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//         <label className='login-label'>
//           Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//         <button className='login-button' type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

export default LoginFormModal;
