import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Reputation from './components/Reputation';
import Speaking from './components/Speaking';
import Perspectives from './components/Perspectives';
import Contact from './components/Contact';
import './App.css';

function App() {
    return (
        <div className="App">
            <Hero />
            <About />
            <Expertise />
            <Reputation />
            <Speaking />
            <Perspectives />
            <Contact />
        </div>
    );
}

export default App;
