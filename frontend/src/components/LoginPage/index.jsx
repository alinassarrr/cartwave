import React from "react";
import InputField from "../InputField";
import Button from "../Button";

const LogIn = ({
  onToggle,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>

        <div className="auth-toggle">
          <Button text="Login" className="toggle-active" onClick={() => {}} />
          <Button text="Register" onClick={onToggle} />
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <InputField
            title="Email Address"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            title="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span> Remember me </span>
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <Button text="Sign In" onClick={onSubmit} className="submit-button" />
        </form>
      </div>
    </div>
  );
};

export default LogIn;