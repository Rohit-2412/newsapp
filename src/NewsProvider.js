import { createContext, useContext, useState } from "react";

const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    return (
        <NewsContext.Provider value={{ articles, setArticles }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;

export const useNewsContext = () => useContext(NewsContext);
