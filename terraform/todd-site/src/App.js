import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import './components/styles.css';

function App() {
    return (
        <div className="App">
            <aside className="sidebar">
                <Home/>
            </aside>
            <main className="main-content">
                <About/>
                <Articles/>
                <Achievements/>
                <Footer/>
            </main>
        </div>
    );
}

export default App;
