import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './App.css';

const BlogPage = () => {
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

  const articles = [
    {
      title: "Understanding Anxiety",
      summary: "Anxiety can stem from a variety of sources, including genetic predisposition, environmental factors, brain chemistry, and life experiences...",
      content: `
        <h2>What is Anxiety?</h2>
        <p>Anxiety is a common mental health condition characterized by feelings of worry, nervousness, or fear that are strong enough to interfere with one's daily activities. It can manifest in various forms, including generalized anxiety disorder (GAD), social anxiety disorder, panic disorder, and specific phobias.</p>
        <h2>Causes of Anxiety</h2>
        <p>Anxiety can stem from a variety of sources, including genetic predisposition, environmental factors, brain chemistry, and life experiences. Stressful events, trauma, or significant life changes can also trigger anxiety.</p>
        <h2>Symptoms of Anxiety</h2>
        <p>Physical symptoms of anxiety include increased heart rate, sweating, trembling, and shortness of breath. Emotional symptoms may involve excessive worry, difficulty concentrating, irritability, and restlessness.</p>
        <h2>Coping Strategies</h2>
        <ul>
          <li><strong>Deep Breathing Exercises:</strong> Practice deep breathing to calm your mind and body.</li>
          <li><strong>Mindfulness Meditation:</strong> Focus on the present moment to reduce anxiety.</li>
          <li><strong>Regular Exercise:</strong> Physical activity can help reduce anxiety symptoms.</li>
          <li><strong>Professional Help:</strong> Seek therapy or counseling to address anxiety.</li>
        </ul>
      `,
      image: "/Anxiety.jpg"
    },
    {
      title: "Tips for Better Sleep",
      summary: "Quality sleep is crucial for physical and mental health. It helps repair the body, consolidate memories, and regulate mood...",
      content: `
        <h2>Importance of Sleep</h2>
        <p>Quality sleep is crucial for physical and mental health. It helps repair the body, consolidate memories, and regulate mood.</p>
        <h2>Common Sleep Issues</h2>
        <p>Insomnia, sleep apnea, and restless leg syndrome are some common sleep disorders that can disrupt sleep patterns.</p>
        <h2>Tips for Better Sleep</h2>
        <ul>
          <li><strong>Establish a Sleep Routine:</strong> Go to bed and wake up at the same time every day.</li>
          <li><strong>Create a Relaxing Environment:</strong> Ensure your bedroom is cool, quiet, and dark.</li>
          <li><strong>Limit Screen Time:</strong> Avoid screens at least an hour before bedtime.</li>
          <li><strong>Avoid Stimulants:</strong> Reduce intake of caffeine and nicotine, especially in the evening.</li>
          <li><strong>Practice Relaxation Techniques:</strong> Engage in activities like reading, meditation, or a warm bath before bed.</li>
        </ul>
      `,
      image: "/sleep.jpg"
    },
    {
      title: "Mindfulness Meditation",
      summary: "Mindfulness is the practice of being present and fully engaged in the current moment without judgment. It involves paying attention to thoughts, feelings, and sensations...",
      content: `
        <h2>What is Mindfulness?</h2>
        <p>Mindfulness is the practice of being present and fully engaged in the current moment without judgment. It involves paying attention to thoughts, feelings, and sensations.</p>
        <h2>Benefits of Mindfulness Meditation</h2>
        <p>Mindfulness meditation can help reduce stress, improve focus, and enhance emotional regulation.</p>
        <h2>How to Practice Mindfulness Meditation</h2>
        <ul>
          <li><strong>Find a Quiet Space:</strong> Choose a place where you won't be disturbed.</li>
          <li><strong>Sit Comfortably:</strong> Sit in a relaxed and upright position.</li>
          <li><strong>Focus on Your Breath:</strong> Pay attention to the sensation of breathing.</li>
          <li><strong>Acknowledge Thoughts:</strong> Gently bring your focus back to your breath when your mind wanders.</li>
        </ul>
      `,
      image: "/Meditation.jpg"
    },
    {
      title: "The Importance of Physical Activity",
      summary: "Regular exercise is essential for maintaining physical and mental health. It can improve mood, boost energy levels, and reduce the risk of chronic diseases...",
      content: `
        <h2>Benefits of Physical Activity</h2>
        <p>Regular exercise is essential for maintaining physical and mental health. It can improve mood, boost energy levels, and reduce the risk of chronic diseases.</p>
        <h2>Types of Physical Activities</h2>
        <ul>
          <li><strong>Aerobic Exercise:</strong> Activities like running, swimming, and cycling.</li>
          <li><strong>Strength Training:</strong> Weightlifting or resistance exercises.</li>
          <li><strong>Flexibility Exercises:</strong> Yoga or stretching.</li>
        </ul>
        <h2>Tips for Staying Active</h2>
        <ul>
          <li><strong>Set Realistic Goals:</strong> Start with achievable goals and gradually increase intensity.</li>
          <li><strong>Find Enjoyable Activities:</strong> Choose exercises you enjoy to stay motivated.</li>
          <li><strong>Incorporate Activity into Daily Routine:</strong> Take the stairs, walk or cycle to work, or join a fitness class.</li>
        </ul>
      `,
      image: "/Activity.jpg"
    },
    {
      title: "Managing Stress",
      summary: "Stress is the body's response to any demand or challenge. While short-term stress can be beneficial, chronic stress can have negative effects on health...",
      content: `
        <h2>Understanding Stress</h2>
        <p>Stress is the body's response to any demand or challenge. While short-term stress can be beneficial, chronic stress can have negative effects on health.</p>
        <h2>Common Causes of Stress</h2>
        <p>Work pressure, financial problems, relationship issues, and major life changes can cause stress.</p>
        <h2>Coping Strategies</h2>
        <ul>
          <li><strong>Practice Relaxation Techniques:</strong> Deep breathing, progressive muscle relaxation, or guided imagery.</li>
          <li><strong>Stay Organized:</strong> Plan and prioritize tasks to reduce overwhelm.</li>
          <li><strong>Connect with Others:</strong> Talk to friends or family for support.</li>
          <li><strong>Engage in Hobbies:</strong> Spend time on activities you enjoy to divert your mind from stress.</li>
        </ul>
      `,
      image: "/stress.jpg"
    },
  ];

  const handleArticleClick = (article) => {
    navigate("/article", { state: { article } });
  };

  return (
    <div className="blog-page">
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
          backgroundImage: "url('/blog.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          borderRadius: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          color: "#000000",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#4A90E2" }}>Blogs</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "20px", color: "#000000" }}>
          Explore our latest articles on mental wellness.
        </p>
      </header>
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article" onClick={() => handleArticleClick(article)}>
            <img src={article.image} alt={article.title} className="article-image" />
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;