import { useState, useEffect } from 'react';
import { getDashBoardData } from '../../../../serviceLayer/api'

const InfoContainer = () => {
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expensesAmount, setExpensesAmount] = useState(0);
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [percentageChanges, setPercentageChanges] = useState({
        income: 0,
        expenses: 0,
        debts: 0,
        investments: 0
    });

    // Get logged-in user data from localStorage
    // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUser = {
        id: "U67890"
    }
    const handleData = async () => {
        try {
            const data = await getDashBoardData();
            if (!data || !data.finance?.users) return;

            // Find the logged-in user's finance data
            const userFinanceData = data.finance.users.find(user => user.id === loggedInUser?.id)?.financeData;
            
            if (userFinanceData) {
                const { income, expenses, debts, investments } = userFinanceData;

                setIncomeAmount(income.total);
                setExpensesAmount(expenses.total);
                setTotalDebts(debts.total);
                setTotalInvestments(investments.total);

                setPercentageChanges({
                    income: income.percentageChange,
                    expenses: expenses.percentageChange,
                    debts: debts.percentageChange,
                    investments: investments.percentageChange
                });
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        if (loggedInUser?.id) {
            handleData();
        }
    }, [loggedInUser?.id]); // Dependency to re-fetch when the user ID changes

    return (
        <>
            <div className="infoContainer d-flex justify-content-between gap-5">

                <div id='income' className='revenue'>
                    <header className='d-flex justify-content-between'>
                        <div className="section1"><h6>Total Income</h6></div>
                        <div className="section2">
                            <img src='sprite1.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' />
                        </div>
                    </header>
                    <p id='amount'>&#8377;<span>{incomeAmount}</span></p>
                    <p id="change" className='infoLine' >
                        <span id='percentage'>{percentageChanges.income}%</span>
                        <span className='arrow'>{percentageChanges.income >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

                <div className="expenses" id='expenses'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Expenses</h6></div>
                        <div className="section2"><img src='sprite2.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' /></div>
                    </header>
                    <p id='amount'>&#8377;<span>{expensesAmount}</span></p>
                    <p id="change" className='infoLine' >
                        <span id='percentage'>{percentageChanges.expenses}%</span>
                        <span className='arrow'>{percentageChanges.expenses >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

                <div id='dets' className="debts">
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Debts</h6></div>
                        <div className="section2"><img src='sprite3.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' /></div>
                    </header>
                    <p id='amount'>&#8377;<span>{totalDebts}</span></p>
                    <p id="change" className='infoLine' >
                        <span id='percentage'>{percentageChanges.debts}%</span>
                        <span className='arrow'>{percentageChanges.debts >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

                <div className="savings" id='investments'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Investments</h6></div>
                        <div className="section2"><img src='sprite4.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' /></div>
                    </header>
                    <p id='amount'>&#8377;<span>{totalInvestments}</span></p>
                    <p id="change" className='infoLine' >
                        <span id='percentage'>{percentageChanges.investments}%</span>
                        <span className='arrow'>{percentageChanges.investments >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

            </div>
        </>
    );
};

export default InfoContainer;
