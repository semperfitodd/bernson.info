import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Impact from './components/Impact'
import Speaking from './components/Speaking'
import Articles from './components/Articles'
import OpenSource from './components/OpenSource'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Impact />
        <Speaking />
        <Articles />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
