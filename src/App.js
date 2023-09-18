import "./App.css";
import Navbar from "./components/Navbar";
import NewsGroup from "./components/NewsGroup";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsProvider from "./NewsProvider";
import { routes } from "./utils/data";

const App = () => {
    const pageSize = 8;
    const [progress, setProgress] = useState(0);

    return (
        <>
            <NewsProvider>
                <Router>
                    <Navbar />
                    <LoadingBar
                        height={3}
                        color="#f11946"
                        progress={progress}
                    />
                    <Routes>
                        {routes.map((route) => {
                            return (
                                <Route
                                    exact
                                    path={route.path}
                                    element={
                                        <NewsGroup
                                            setProgress={setProgress}
                                            key={route.category}
                                            pageSize={pageSize}
                                            country="in"
                                            category={route.category}
                                        />
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </NewsProvider>
        </>
    );
};

export default App;
