import React, { useState } from "react";
import LogIn from "../../components/LoginPage";
import Register from "../../components/RegisterPage";
import './styles.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginSubmit = () => {
        console.log('Login data', {email, password});
        //Axios 
    };

    const handleRegisterSubmit = () => {
        console.log('register data', {name, email, password, confirmPassword});
        //axios
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-wrapper">
            {isLogin ? (
                <LogIn email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleLoginSubmit} onToggle={toggleForm}/>
            ): (
                <Register name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} onSubmit={handleRegisterSubmit} onToggle={toggleForm} />
            )}
        </div>
    );

};

export default AuthPage;