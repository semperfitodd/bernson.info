import React, {useState} from 'react';
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import './components/styles.css';

function App() {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="App">
            <MobileMenu/>
            <aside className="sidebar">
                <Home/>
            </aside>
            <main className="main-content">
                <About showDetails={showDetails} onToggle={handleToggle}/>
                <Articles/>
                <Achievements/>
                <Footer/>
            </main>
        </div>
    );
}

export default App;
