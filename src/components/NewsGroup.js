import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNewsContext } from "../NewsProvider";

const NewsGroup = (props) => {
    const { articles, setArticles } = useNewsContext();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsMonkey`;
        updateNews();
    }, [props.category]);

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        // filter out articles with no description
        parsedData.articles = parsedData.articles.filter(
            (article) => article.description !== null
        );
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        setPage(nextPage);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles([...articles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <h1 className="text-center font-semibold text-5xl mt-4 mb-10">
                Top {capitalize(props.category)} Headlines
            </h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container px-10 lg:px-8 md:px-6 sm:px-4">
                    <div className="grid grid-cols-2 gap-5">
                        {articles.map((item) => (
                            <div className="w-full px-2" key={item.url}>
                                <NewsItem
                                    title={item.title}
                                    description={item.description}
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url}
                                    author={item.author}
                                    date={item.publishedAt}
                                    source={item.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

NewsGroup.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
};

NewsGroup.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default NewsGroup;
