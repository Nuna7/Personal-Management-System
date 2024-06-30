import React from 'react';
import PropTypes from 'prop-types';
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

NewsArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsArticle;
