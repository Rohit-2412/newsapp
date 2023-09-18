import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNewsContext } from "../NewsProvider";
import { capitalize } from "../utils/helperFunctions";
import { routes } from "../utils/data";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const { setArticles } = useNewsContext();

    const handleSearch = async (e) => {
        e.preventDefault();

        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API}`;

        const res = await fetch(url);

        const { articles } = await res.json();

        setArticles(articles);
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        NewsMonkey
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {routes.map((route) => {
                                return (
                                    <li className="nav-item" key={route.path}>
                                        <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={route.path}
                                        >
                                            {capitalize(route.category)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <form className="form-inline d-flex gap-2">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            value={query}
                            placeholder="Search"
                            aria-label="Search"
                            id="search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
