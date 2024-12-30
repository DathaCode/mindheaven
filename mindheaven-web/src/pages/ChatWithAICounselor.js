import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import './App.css';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaYo5alliAFTdQjo6AKf9vJwkvw63AP7c",
  authDomain: "mindheaven-2ca45.firebaseapp.com",
  databaseURL: "https://mindheaven-2ca45-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mindheaven-2ca45",
  storageBucket: "mindheaven-2ca45.firebasestorage.app",
  messagingSenderId: "262454485333",
  appId: "1:262454485333:web:8dc9d921e43aa68999cfdc",
  measurementId: "G-R0ECVHZ0NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ChatWithAICounselor = () => {
  const [user, setUser] = useState(null);
  const [userText, setUserText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const chatDoc = await getDoc(doc(db, "chats", user.uid));
          if (chatDoc.exists()) {
            setChatHistory(chatDoc.data().history);
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
          setError("Failed to fetch chat history. Please check your internet connection.");
        }
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

  const handleInputChange = (e) => {
    setUserText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userText.trim() === "") {
      setMessage("Please enter a message.");
      return;
    }

    const newChatHistory = [...chatHistory, { role: "user", content: userText }];
    setChatHistory(newChatHistory);
    setUserText("");

    try {
      const response = await fetch("http://localhost:8080/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userText }), // userText is passed in the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const updatedChatHistory = [...newChatHistory, { role: "assistant", content: data.response }];
      setChatHistory(updatedChatHistory);
      setMessage(data.message);

      // Store chat history in Firestore
      await setDoc(doc(db, "chats", user.uid), { history: updatedChatHistory });
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data. Please try again later.");
    }
  };

  const handleViewTherapyRecords = () => {
    navigate("/therapy-records");
  };

  return (
    <div className="chat-page">
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
      <header className="hero-section"
        style={{
          backgroundImage: "url('/mood2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px",
          borderRadius: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          color: "#000000",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", color: "#4A90E2" }}>Chat with Your AI Counselor</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "50px", color: "#000000" }}>
          Get real-time advice and support from your AI counselor.
        </p>
        <button onClick={handleViewTherapyRecords} className="therapy-records-button">Therapy Records</button>
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
        <form onSubmit={handleSubmit} className="chat-input-form">
          <textarea
            value={userText}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="chat-input"
          />
          <button type="submit" className="chat-submit-button">Send</button>
        </form>
        {message && <p className="chat-message">{message}</p>}
      </div>
    </div>
  );
};

export default ChatWithAICounselor;