import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import './App.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isLogin) {
            // Login scenario
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/home");
            } catch (error) {
                setError(displayValidationMessage(error.code));
            }
        } else {
            // Signup scenario
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email,
                    dob,
                    gender
                });
                navigate("/home");
            } catch (error) {
                setError(displayValidationMessage(error.code));
            }
        }
    };

    const displayValidationMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up first.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use':
                return 'This email is already in use. Please log in.';
            case 'auth/invalid-email':
                return 'Invalid email address. Please use a valid email.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
                    {!isLogin && (
                        <>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm Password"
                                className="input-field"
                            />
                            <input
                                type="date"
                                value={dob}
                                onChange={handleDobChange}
                                placeholder="Date of Birth"
                                className="input-field"
                            />
                            <select value={gender} onChange={handleGenderChange} className="input-field">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </>
                    )}
                    <button type="submit" className="submit-button">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                {error && <p id="validationMessage" className="error-message">{error}</p>}
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;