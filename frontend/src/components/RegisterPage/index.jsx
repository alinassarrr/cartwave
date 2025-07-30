import React from 'react';
import InputField from '../InputField';
import Button from '../Button';

const Register = ({ onToggle, name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, onSubmit }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join thousands of satisfied customers</p>

        <div className="auth-toggle">
          <Button text="Login" onClick={onToggle} />
          <Button text="Register" className="toggle-active" onClick={() => {}} />
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
            title="User Name"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            title="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            title="Confirm Password"
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button text="Sign Up" onClick={onSubmit} className="submit-button" />

          <div className="auth-footer">
            Already have an account? <span onClick={onToggle}>Sign in</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
