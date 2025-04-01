import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { color } from 'chart.js/helpers';
const SlideSection = ({sectionRef}) => {

    const contentStyle = {
        textAlign: 'center',
        padding: '10px',
        borderRadius: '10px',
        fontFamily: 'Arial',
        fontSize: '1rem',
        background: '#fff',
        color: '#333',
        border: '1px solid #ccc',
        margin: '10px 0'
    };


    return (
        <>
            <div ref={sectionRef} id='features' className="container carousel">
                <h3 className='text-center'>Features</h3>
                <Carousel
                    autoplay={{
                        dotDuration: true,
                        dotColor: 'red'
                    }}
                    autoplaySpeed={5000}
                >
                    <div >
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                    <h1 style={contentStyle}>Track Your Expenses, Stay in Control!</h1>
                                <p style={contentStyle}>
                                    Stay on top of your finances with our intuitive expense tracker. Monitor your daily, weekly, and monthly spending at a glance. Get detailed insights with interactive charts, set budgets, and track trends to make smarter financial decisions. Whether it's groceries, bills, or savings—stay in control and plan ahead with ease!
                                </p>
                            </div>
                            <div>
                                <img className='image' src="./feature1.png" alt="" style={{ width: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                    <h1 style={contentStyle}>Smart Investment Plans for a Secure Future!</h1>
                                <p style={contentStyle} >
                                    Build a strong financial foundation with well-structured investment plans. From stable Fixed Deposits and reliable Gold investments to high-growth Stocks and SIPs, diversify your portfolio wisely. Secure your future with Health & Term Insurance, plan for unexpected expenses with Emergency Funds, and explore new opportunities with IPOs. Stay informed, invest smartly, and achieve financial freedom with strategic planning!
                                </p>
                            </div>
                            <div>
                                <img className='image' src="./feature2.png" alt="" style={{ width: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                    <h1 style={contentStyle}>Accelerate Your Loans & Boost Your Credit Score!</h1>
                                <p style={contentStyle} >
                                    Stay ahead of your loan payments with timely notifications and reminders. Pay off your loans faster, avoid late fees, and improve your CIBIL score effortlessly. Get smart insights on managing EMIs, optimizing interest payments, and achieving financial freedom sooner. Take control of your debt and move towards a stress-free financial future!
                                </p>
                            </div>
                            <div>
                                <img className='image' src="./feature3.png" alt="" style={{ width: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                    <h1 style={contentStyle}>Manage All Your Finances in One Place!</h1>
                                <p style={contentStyle} >
                                    Gain complete control over your financial journey with a comprehensive view of your monthly and yearly progress, categorized budgets, savings, EMI payments, interest payments, credit score, and loan management. Track your financial health, identify risks, and make well-informed decisions to achieve your financial goals effortlessly. With real-time insights and smart tracking, you can optimize your spending, maximize savings, and stay ahead on your financial path!
                                </p>
                            </div>
                            <div>
                                <img className='image' src="./feature4.png" alt="" style={{ width: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default SlideSection