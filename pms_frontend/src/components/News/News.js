import React from "react";
import { useState, useEffect } from 'react';
import authApi from '../../api/authApi';
import TextInput from '../UI/textInput';
import OptionInput from '../UI/optionInput'
import getCsrfToken from '../../utility/getCsrfToken';

import { NEWS_SOURCES, NEWS } from '../../utility/constants';
import NewsArticle from './NewsArticle';

const News = () => {
    const [topHeadlines, setTopHeadlines] = useState({
        keywords: '',
        country: 'in',
        category: 'general',
        language: 'en'
    });

    const [allArticles, setAllArticles] = useState({
        keywords: '',
        sources: 'cnn',
        language: 'en',
        from_date: '',
        to_date: '',
        sort_by: 'popularity'
    });

    const [options, setOptions] = useState({
        countryOptions: [],
        categoryOptions: [],
        languageOptions: [],
        sourceOptions: [],
        sortByOptions: []
    });

    const [news, setNews] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await authApi.get(NEWS_SOURCES);
                setOptions(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching options:', error);
                setErrorMessage("Couldn't fetch sources at the moment. Please try later.");
            }
        };
        fetchOptions();
    }, []);

    const handleTopHeadlinesChange = (e) => {
        const { name, value } = e.target;
        setTopHeadlines({
            ...topHeadlines,
            [name]: value
        });
    };

    const handleAllArticlesChange = (e) => {
        const { name, value } = e.target;
        setAllArticles({
            ...allArticles,
            [name]: value
        });
    };

    const request = async (params, link) => {
        try {
            const response = await authApi.get(NEWS + link, {
                params,
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCsrfToken()
                }
            });
            if (response.data.message) {
                setNews([]);
            } else {
                setNews(Object.values(response.data));
            }
            setSearchPerformed(true);
            setErrorMessage('');

        } catch (error) {
            console.error(error);
            setErrorMessage("Couldn't fetch news at the moment. Please try later.");

        }
    };

    const handleTopHeadlinesSubmit = (event) => {
        event.preventDefault();
        request(topHeadlines, "headlines");
    };

    const handleAllArticlesSubmit = (event) => {
        event.preventDefault();
        request(allArticles, "articles");
    };
    return (
        <div>
            <div className='news-search-forms-container'>
                <div className='news-form-container'>
                    <h2>Top Headlines</h2>
                    <form onSubmit={handleTopHeadlinesSubmit}>
                        <TextInput id="keyword1" name="keywords" label="Keywords:" placeholder="Enter Keyword or Keyphrase" value={topHeadlines.keywords} onChange={handleTopHeadlinesChange} />
                        <OptionInput id="country1" name="country" label="Country:" placeholder="Country" options={options.countryOptions} value={topHeadlines.country} onChange={handleTopHeadlinesChange} />
                        <OptionInput id="category1" name="category" label="Category:" options={options.categoryOptions} value={topHeadlines.category} onChange={handleTopHeadlinesChange} />
                        <OptionInput id="language1" name="language" label="Language:" options={options.languageOptions} value={topHeadlines.language} onChange={handleTopHeadlinesChange} />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div className='news-form-container'>
                    <h2>All Articles</h2>
                    <form onSubmit={handleAllArticlesSubmit}>
                        <TextInput id="keyword2" name="keywords" label="Keywords:" placeholder="Enter Keyword or Keyphrase" value={allArticles.keywords} onChange={handleAllArticlesChange} />
                        <OptionInput id="sources2" name="sources" label="Sources:" options={options.sourceOptions} value={allArticles.sources} onChange={handleAllArticlesChange} />
                        <OptionInput id="language2" name="language" label="Language:" options={options.languageOptions} value={allArticles.language} onChange={handleAllArticlesChange} />
                        <OptionInput id="sortBy" name="sort_by" label="Sort By:" options={options.sortByOptions} value={allArticles.sort_by} onChange={handleAllArticlesChange} />
                        <div className="date-range">
                            <div className="date-group">
                                <label htmlFor="fromDate">From Date:</label>
                                <input type="date" id="fromDate" name="from_date" value={allArticles.from_date} onChange={handleAllArticlesChange} />
                            </div>
                            <div className="date-group">
                                <label htmlFor="toDate">To Date:</label>
                                <input type="date" id="toDate" name="to_date" value={allArticles.to_date} onChange={handleAllArticlesChange} />
                            </div>
                        </div>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className='articles-container'>
                {searchPerformed && news.length === 0 && <div className='no-article'><h2>No articles found</h2></div>}
                {news.length > 0 && (
                    <div className='news-list'>
                        {news.map((article, index) => (
                            <NewsArticle key={index} article={article} />
                        ))}
                    </div>
                )}
            </div>
            

            {errorMessage &&  <div className="news-error-message"><p>{errorMessage}</p></div> }

        </div>
    );
};

export default News;