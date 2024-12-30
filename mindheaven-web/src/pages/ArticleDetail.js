import React from "react";
import { useLocation, Link } from "react-router-dom";
import './App.css';

const ArticleDetail = () => {
  const location = useLocation();
  const { article } = location.state;

  return (
    <div className="article-detail-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/home">MindHeaven</Link>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>
      </nav>
      <div className="article-detail">
        <img src={article.image} alt={article.title} className="article-detail-image" />
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default ArticleDetail;