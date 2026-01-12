import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Reputation from './components/Reputation'
import Speaking from './components/Speaking'
import Perspectives from './components/Perspectives'
import Contact from './components/Contact'

export default function Home() {
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
  )
}
