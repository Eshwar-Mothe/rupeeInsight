import React from 'react'
import NavBar from '../Common/NavBar'
import Footer from '../Common/Footer'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import SlideSection from './SlideSection'
import Features from './Features'

const LandingPage = () => {
    return (
        <>
            <header className='sticky-top'>
                <NavBar />
            </header >
            <main>
                <HeroSection/>
                <StatsSection/>
                <SlideSection />
                <Features />
                This is main section
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default LandingPage