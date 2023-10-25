// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const disabled = credential.length < 4 || password.length < 6

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }

      // console.log("DATA ", data)
      // console.log("ERRORS ", data.message)
      //check your 401 error handler
      });
  };

  const handleDemo = (e) => {
      e.preventDefault()
      setCredential("demo@user.io")
      setPassword("password")
      return dispatch(sessionActions.login({
        credential: "demo@user.io",
        password: "password"
      })).then(closeModal)
  }

  return (
    <div className="form-field">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} >
        {/* <label className="label"> */}
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="form-slot"
          />
        {/* </label> */}
        
        {/* <label className="label"> */}
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-slot"
          />
        {/* </label> */}
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div className="form-slot"> 
        
        <button type="submit" className="login-button" disabled={disabled}>Log In</button>
        <button className="demo-user" onClick={handleDemo}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;