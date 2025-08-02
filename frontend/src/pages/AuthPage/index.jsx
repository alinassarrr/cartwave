import React, { useState } from "react";
import LogIn from "../../components/LoginPage";
import Register from "../../components/RegisterPage";
import "./styles.css";
import "./styles.css";
import { useUser } from "../../contexts/UserContext/index.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = () => {
    const mockUser = {
      name: "salem",
      role: "admin",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    if (mockUser.role === "user") {
      navigate("/home");
    } else {
      navigate("/admin/dashboard");
    }
  };

  // const handleLoginSubmit = async () => {
  //     try {
  //         const response = await axios.post("http://localhost:8080/api/login", {
  //             email, password,
  //         });
  //         const user = response.data;
  // const handleLoginSubmit = async () => {
  //     try {
  //         const response = await axios.post("http://localhost:8080/api/login", {
  //             email, password,
  //         });
  //         const user = response.data;

  //         setUser(user);
  //         localStorage.setItem("user", JSON.stringify(user));
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
  const handleRegisterSubmit = () => {
    console.log("register data", { name, email, password, confirmPassword });
    //axios
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
