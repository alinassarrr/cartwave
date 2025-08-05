import React, { useState } from "react";
import LogIn from "../../components/LoginPage";
import Register from "../../components/RegisterPage";
import "./styles.css";
// import { useUser } from "../../contexts/UserContext/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginUserThunk,
  selectAuthLoading,
  selectAuthError,
} from "../../store/auth/slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    if (email === "admin@test.com" && password === "admin") {
      const mockUser = {
        user: {
          name: "Admin User",
          role: "admin",
        },
        token: "mock-token",
      };
      dispatch(loginUser(mockUser));
      // (
      //   loginUserThunk.fulfilled(mockUser, "auth/loginUser", {
      //     email,
      //     password,
      //   })
      // );
      navigate("/admin/dashboard");
    } else if (email === "customer@test.com" && password === "customer") {
      const mockUser = {
        user: {
          name: "Customer name",
          role: "customer",
        },
        token: "mock-customer-token",
      };
      dispatch(loginUser(mockUser));
      // (
      //   loginUserThunk.fulfilled(mockUser, "auth/loginUser", {
      //     email,
      //     password,
      //   })
      // );
      navigate("/home");
    } else {
      //api call
      //dispatch (loginuserthunk ({email, password}));
      alert("invalid");
    }
    // setUser(mockUser);
    // localStorage.setItem("user", JSON.stringify(mockUser));
    // dispatch(loginUser(mockUser));
    // if (mockUser.user.role === "customer") {
    //   navigate("/home");
    // } else {
    //   navigate("/admin/dashboard");
    // }
  };

  // const handleLoginSubmit = async () => {
  //     try {
  //         const response = await axios.post("http://localhost:8080/api/login", {
  //             email, password,
  //         });
  //         const user = response.data;

  //         setUser(user);
  //         localStorage.setItem("user", JSON.stringify(user));

  //         if(user.role === "admin") {
  //             navigate("/admin/dashboard");
  //         } else {
  //             navigate("home");
  //         }
  //     } catch (error){
  //         console.error("Login failed", error.response?.data || error.message);

  //     }
  // };

  const handleRegisterSubmit = () => {
    console.log("register data", { name, email, password, confirmPassword });
    //axios
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
