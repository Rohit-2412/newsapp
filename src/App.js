import './App.css';
import Navbar from './components/Navbar';
import NewsGroup from './components/NewsGroup';
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'


export default class App extends Component {
    pageSize = 8;
    apiKey = process.env.REACT_APP_NEWS_API
    state = {
        progress: 0
    }

    setProgress = (progress) => {
        this.setState({
            progress: progress
        })
    }
    render() {
        return (
            <>
                <Router>
                    <Navbar />

                    <LoadingBar
                        height={3}
                        color='#f11946'
                        progress={this.state.progress}
                    />

                    <Routes>
                        <Route exact path='/' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="" pageSize={this.pageSize} country="in" category="general" />} />
                        <Route exact path='/business' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
                        <Route exact path='/entertainment' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
                        <Route exact path='/health' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
                        <Route exact path='/general' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
                        <Route exact path='/science' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
                        <Route exact path='/sports' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
                        <Route exact path='/technology' element={<NewsGroup setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
                    </Routes>

                </Router>
            </>
        )
    }
}
