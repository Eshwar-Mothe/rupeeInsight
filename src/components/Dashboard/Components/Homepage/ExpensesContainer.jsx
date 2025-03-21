import React from 'react';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const transactions = [
    { id: 1, type: 'debit', title: 'Swiggy Ltd', date: '16 March 2025, 16:48', amount: 1999 },
    { id: 2, type: 'credit', title: 'Swiggy Ltd', date: '16 March 2025, 16:48', amount: 1999 },
    { id: 3, type: 'debit', title: 'Swiggy Ltd', date: '16 March 2025, 16:48', amount: 1999 },
    { id: 4, type: 'credit', title: 'Swiggy Ltd', date: '16 March 2025, 16:48', amount: 1999 },
    { id: 5, type: 'debit', title: 'Swiggy Ltd', date: '16 March 2025, 16:48', amount: 1999 },
];

const ExpensesContainer = () => {
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
                {transactions.map(({ id, type, title, date, amount }) => (
                    <div key={id} className="d-flex align-items-center justify-content-between px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                            <div className={`transType ${type}`}>
                                {type === 'debit' ? <GoArrowDownLeft /> : <GoArrowUpRight />}
                            </div>
                            <div>
                                <h6 className="title">{title}</h6>
                                <p className="trans">Paid on <span className='transDateTime'>{date}</span></p>
                            </div>
                        </div>
                        <div className={`transactionAmount ${type}`}>
                            {type === 'debit' ? '-' : '+'} &#8377;{amount.toLocaleString()}.00
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesContainer;