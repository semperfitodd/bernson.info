import Home from './components/Home'
import About from './components/About'
import Articles from './components/Articles'
import Achievements from './components/Achievements'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'

export default function Page() {
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
  )
}
