import React, { useRef } from 'react';
import NavBar from '../Common/NavBar';
import Footer from '../Common/Footer';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import SlideSection from './SlideSection';
import Features from './Features';
import ImageSection from './ImageSection';
import Reviews from './Reviews';

const LandingPage = () => {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const featuresRef = useRef(null);
    const aboutRef = useRef(null);
    const reviewsRef = useRef(null);
    const taxRef = useRef(null);

    return (
        <>
            <header className='sticky-top'>
                <NavBar heroRef={heroRef} statsRef={statsRef} featuresRef={featuresRef} aboutRef={aboutRef} taxRef={taxRef} reviewsRef={reviewsRef}/>
            </header>
            <main>
                <HeroSection sectionRef={heroRef} />
                <StatsSection sectionRef={statsRef} />
                <SlideSection sectionRef={featuresRef} />
                <Features sectionRef={aboutRef} />
                <Reviews sectionRef={reviewsRef} />
                <ImageSection sectionRef={taxRef} />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default LandingPage;
