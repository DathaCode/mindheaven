import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import './Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            setError(displayValidationMessage(error.code));
        }
    };

    const displayValidationMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up first.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            default:
                return 'Login failed. Please try again.';
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>
                    Don't have an account?{" "}
                    <button onClick={() => navigate("/signup")} className="toggle-button">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
