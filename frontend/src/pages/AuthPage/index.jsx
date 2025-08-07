import React, { useState } from "react";
import LogIn from "../../components/LoginPage";
import Register from "../../components/RegisterPage";
import "./styles.css";
// import { useUser } from "../../contexts/UserContext/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserThunk,
  registerUserThunk,
  selectAuthLoading,
  selectAuthError,
} from "../../store/auth/slice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const { setUser } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleLoginSubmit = async () => {
    try {
      const result = await dispatch(
        loginUserThunk({ email, password })
      ).unwrap();

      // if (result.user.role === "admin") {
      //   navigate("/admin/dashboard");
      // } else {
      //   navigate("/home");
      // }
      console.log("Login result:", result);
      console.log("User object:", result.user);

      if (result.user.admin) {
        console.log("User is admin");
        navigate("/admin/dashboard");
      } else {
        console.log("User is customer");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      const userData = {
        first_name: name.split(" ")[0] || name,
        last_name: name.split(" ").slice(1).join(" ") || "",
        email,
        password,
        password_confirmation: confirmPassword,
      };
      const result = await dispatch(registerUserThunk(userData)).unwrap();
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <div className="auth-wrapper">
        {isLogin ? (
          <LogIn
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLoginSubmit}
            onToggle={toggleForm}
          />
        ) : (
          <Register
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handleRegisterSubmit}
            onToggle={toggleForm}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
