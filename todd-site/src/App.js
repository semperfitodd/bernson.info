import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import './components/styles.css';

function App() {
    return (
        <div className="App">
            <MobileMenu />
            <aside className="sidebar" aria-label="Navigation sidebar">
                <Home />
            </aside>
            <main className="main-content" role="main">
                <About />
                <Articles />
                <Achievements />
                <Footer />
            </main>
        </div>
    );
}

export default App;
