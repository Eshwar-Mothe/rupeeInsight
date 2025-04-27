import React, { useEffect, useState } from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ExpensesContainer = () => {
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user.expenses)
        if (user && Array.isArray(user.expenses)) {
            const sorted = user.expenses
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);

            setRecentTransactions(sorted);
        }
    }, []);

    return (
        <div className="expensesContainer">
            <header className='d-flex justify-content-between align-items-center gap-5'>
                <div className="section1">
                    <h6>Recent Transactions</h6>
                    <p>Your last 5 transactions</p>
                </div>
                <div className="filter">
                    <Link to={'/expenses'}><button>View All</button></Link>
                </div>
            </header>

            <div className="transactions">
                {recentTransactions.length > 0 ? recentTransactions.map(({ id, type, subcategory, date, amount }) => (
                    <div key={id} className="d-flex align-items-center justify-content-between px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                            <div className={`transType ${type}`}>
                                {type === 'expense' ? <GoArrowUpRight /> : <GoArrowDownLeft />}
                            </div>
                            <div>
                                <h6 className="title">{subcategory}</h6>
                                <p className="trans">Paid on <span className='transDate'>{new Date(date).toLocaleDateString()}</span></p>
                            </div>
                        </div>
                        <div className={`transactionAmount ${type}`}>
                            {type === 'expense' ? '-' : '+'} &#8377;{parseFloat(amount).toLocaleString()}.00
                        </div>
                    </div>
                )) : (
                    <div>
                        <p className='px-4 py-3'>No recent transactions found. Click below to start Track</p>
                        <Link to={'/expenses'}><button>Add New..!</button></Link>
                    </div>)}
            </div>
        </div>
    );
};

export default ExpensesContainer;
