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
            <h1
                className="text-center display-4 font-weight-bold"
                style={{
                    margin: "35px 0px",
                    marginTop: "90px",
                    fontWeight: "400",
                }}
            >
                NewsMonkey - Top {capitalize(props.category)} Headlines
            </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-3" key={element.url}>
                                <NewsItem
                                    title={
                                        element.title
                                            ? element.title.slice(0, 40)
                                            : ""
                                    }
                                    description={
                                        element.description
                                            ? element.description.slice(0, 88)
                                            : ""
                                    }
                                    imageUrl={
                                        element.urlToImage
                                            ? element.urlToImage
                                            : "https://1001freedownloads.s3.amazonaws.com/vector/thumb/106167/news.png"
                                    }
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
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
