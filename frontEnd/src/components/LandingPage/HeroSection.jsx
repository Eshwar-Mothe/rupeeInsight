import React from 'react'
import '/src/App.css'


const HeroSection = ({sectionRef}) => {
    return (
        <>
            <div ref={sectionRef} id='hero' className="container">
                <div className="heroSectionContainer ">
                    <div className="leftSection">
                        <h1 >Rupee Insight-Track, Save, and Grow Your Money Smarter..!</h1>
                        <p>Rupee Insight helps you track, save, and grow your money smarter with visual budgeting, goal-based saving, and categorized transactions. Get AI-driven insights, smart alerts, and easy debt payoff strategies through interactive charts and trends!</p>
                    </div>
                    <div className="rightSection ">
                        <img src={'./logo.png'} width={300} alt="heroSectionImage" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection