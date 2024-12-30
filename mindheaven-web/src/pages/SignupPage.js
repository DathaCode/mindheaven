import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import './App.css';

const SignupPage = () => {
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
            setError("Successfully registered, Please log in~");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setError(displayValidationMessage(error.code));
        }
    };

    const displayValidationMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Successfully registered, Please log in~';
            case 'auth/invalid-email':
                return 'Invalid email address. Please use a valid email.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1>Register</h1>
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
                    <button type="submit" className="submit-button">Register</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>
                    Already have an account?{" "}
                    <button onClick={() => navigate("/login")} className="toggle-button">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;