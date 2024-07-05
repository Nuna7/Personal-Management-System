import React from 'react';
import './News.css'

const NewsArticle = ({ article }) => {
  return (
    <div className="news-article">
      <h3 className="news-title">{article.title}</h3>
      <p className="news-description">{article.description}</p>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="news-image" />
      )}
      <p className="news-author"><strong>Author:</strong> {article.author}</p>
      <p className="news-source"><strong>Source:</strong> {article.source.name}</p>
      <p className="news-published-at"><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
    </div>
  );
};

export default NewsArticle;
