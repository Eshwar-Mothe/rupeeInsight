import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

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

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const calculatePercentageChange = (items) => {
        const monthlyTotals = {};

        console.log("items",items)
        items.forEach(item => {
            const month = dayjs(item.date).format("YYYY-MM");
            monthlyTotals[month] = (monthlyTotals[month] || 0) + item.amount;
        });

        const months = Object.keys(monthlyTotals).sort();

        if (months.length < 2) return 0;

        const prevMonth = monthlyTotals[months[months.length - 2]];
        const currentMonth = monthlyTotals[months[months.length - 1]];

        if (prevMonth === 0) return 100;

        const diff = currentMonth - prevMonth;
        const percentage = (diff / prevMonth) * 100;
        return parseFloat(percentage.toFixed(2));
    };

    const handleData = async () => {
        try {
            if (!loggedInUser || !loggedInUser.totals) return;

            const userFinanceData = loggedInUser.totals;

            if (userFinanceData) {
                const { totalIncome, totalExpenses, totalLoans, totalSavings } = userFinanceData;

                setIncomeAmount(totalIncome);
                setExpensesAmount(totalExpenses);
                setTotalDebts(totalLoans);
                setTotalInvestments(totalSavings);

                const income =      loggedInUser.income || [];
                const expenses =    loggedInUser.expenses || [];
                const debts =       loggedInUser.debts || [];
                const investments = loggedInUser.investments || [];

                setPercentageChanges({
                    income: calculatePercentageChange(income),
                    expenses: calculatePercentageChange(expenses),
                    debts: calculatePercentageChange(debts),
                    investments: calculatePercentageChange(investments)
                });
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        if (loggedInUser?._id) {
            handleData();
        }
    }, [loggedInUser?.id]);

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
                        <span id='percentage'>{Math.abs(percentageChanges.income)}%</span>
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
                        <span id='percentage'>{Math.abs(percentageChanges.expenses)}%</span>
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
                        <span id='percentage'>{Math.abs(percentageChanges.debts)}%</span>
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
                        <span id='percentage'>{Math.abs(percentageChanges.investments)}%</span>
                        <span className='arrow'>{percentageChanges.investments >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

            </div>
        </>
    );
};

export default InfoContainer;
