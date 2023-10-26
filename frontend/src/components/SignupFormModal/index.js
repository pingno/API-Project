// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const signUpButton = disabled ? "login-button-on" : "login-button-off"
  const disabled = username.length < 4 || password.length < 6 || !email || !username || !firstName || !lastName || !password || !confirmPassword

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="form-field">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.email && <p style={{ fontSize: "10px", color: "red" }}>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.username && <p style={{ fontSize: "10px", color: "red" }}>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.firstName && <p style={{ fontSize: "10px", color: "red" }}>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.lastName && <p style={{ fontSize: "10px", color: "red" }}>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.password && <p style={{ fontSize: "10px", color: "red" }}>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-slot"
          />
        </label>
        {errors.confirmPassword && (
          <p style={{ fontSize: "10px", color: "red" }}>{errors.confirmPassword}</p>
        )}
        <div>
        <button type="submit" className="signup-button" disabled={disabled}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;