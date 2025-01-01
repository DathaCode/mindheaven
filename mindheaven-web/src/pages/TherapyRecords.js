import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './App.css';
import './Auth.css';

// Initialize Firebase
const auth = getAuth();
const db = getFirestore();

const TherapyRecords = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const chatDoc = await getDoc(doc(db, "chats", user.uid));
          if (chatDoc.exists()) {
            setChatHistory(chatDoc.data().history);
          }
        } catch (error) {
          console.error("Error fetching therapy records:", error);
          setError("Failed to fetch therapy records. Please check your internet connection.");
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="therapy-records-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/home">MindHeaven</Link>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/chat-with-ai-counselor" className="nav-link">Chat with Your AI Counselor</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>
      </nav>
      <header className="hero-section"
        style={{
          backgroundImage: "url('/therapy-records.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px",
          borderRadius: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          color: "#000000",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", color: "#4A90E2" }}>Therapy Records</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "50px", color: "#000000" }}>
          View your past therapy sessions.
        </p>
      </header>
      <div className="chat-container">
        {error && <p className="error-message">{error}</p>}
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.role}`}>
              <p>{chat.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapyRecords;