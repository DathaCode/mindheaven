import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './App.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/home">MindHeaven</Link>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/chat-with-ai-counselor" className="nav-link">Chat with Your AI Counselor</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <header className="hero-section"
        style={{
          backgroundImage: "url('/mindHeaven1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "150px",
          borderRadius: "0px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          color: "#000000",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#4A90E2", marginBottom: "100px" }}>Welcome to</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "200px", color: "#000000" }}>
          ~Your journey to emotional well-being starts here~
        </p>
        {/* Call-to-Action Button */}
        <Link to="/chat-with-ai-counselor">
          <button className="cta-button"
            style={{
              backgroundColor: "transparent",
              color: "#000000",
              fontSize: "1rem",
              padding: "25px 25px",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              marginTop: "25px",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#4A90E2";
              e.target.style.color = "#fff";
              e.target.style.boxShadow = "0 0 10px #4A90E2, 0 0 20px #4A90E2, 0 0 30pxrgb(175, 226, 74)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#000000";
              e.target.style.boxShadow = "none";
            }}
          >
            Chat with Your AI Counselor
          </button>
        </Link>
      </header>
      <div className="additional-section">
        <h2>Why MindHeaven?</h2>
        <p>
          MindHeaven leverages cutting-edge AI technologies like NLP and sentiment analysis to help you track your mood and emotions in real time. Whether you're looking for personalized mental health resources or telecounseling, we are here to support your journey toward emotional autonomy and well-being.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
