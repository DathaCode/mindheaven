import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatWithAICounselor from "./pages/ChatWithAICounselor";
import BlogPage from "./pages/BlogPage";
import ArticleDetail from "./pages/ArticleDetail";
import TherapyRecords from "./pages/TherapyRecords";
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/chat-with-ai-counselor" element={<ChatWithAICounselor />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/article" element={<ArticleDetail />} />
                    <Route path="/therapy-records" element={<TherapyRecords />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
