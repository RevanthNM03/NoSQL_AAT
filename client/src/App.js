import React from "react";
import './style.css';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Graphs from './components/Graphs';

const App = () => {
    return(
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/graph" element={<Graphs />} />      
            </Routes>
        </>
    );
};

export default App;