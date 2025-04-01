import React, { useEffect, useState } from 'react'

const StatsSection = ({sectionRef}) => {
    const [counts, setCounts] = useState([1, 1, 1, 1, 1]);

    const features = ['Active Users', 'Categories', 'Smart Expense Features', 'Accelerated Loan Payments', 'Smart Investment Strategies']
    useEffect(() => {
        const endValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * (500 - 5 + 1)) + 50);
        const duration = 2500;
        const stepTimes = endValues.map(end => duration / end);
        let starts = [1, 1, 1, 1, 1];

        const intervals = endValues.map((end, index) => {
            return setInterval(() => {
                if (starts[index] < end) {
                    starts[index] += 1;
                    setCounts(prevCounts => {
                        const newCounts = [...prevCounts];
                        newCounts[index] = starts[index];
                        return newCounts;
                    });
                } else {
                    clearInterval(intervals[index]);
                }
            }, stepTimes[index]);
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, []);

    return (
        <>
            <div  id='stats'>
                <hr className='mx-3' />

                <div ref={sectionRef} className="container statsContainer text-center">
                    {counts.map((count, index) => (
                        <div key={index} className={`stat stat${index + 1}`}>
                            <h1>{count}+</h1>
                            <p>{features[index]}</p>
                        </div>
                    ))}
                </div>

                <hr className='mx-3' />
            </div>
        </>
    );
};

export default StatsSection;

