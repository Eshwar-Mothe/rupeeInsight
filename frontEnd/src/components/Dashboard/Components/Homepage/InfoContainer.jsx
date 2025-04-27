import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const InfoContainer = () => {
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expensesAmount, setExpensesAmount] = useState(0);
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [percentageChanges, setPercentageChanges] = useState({
        expenses: 0,
        debts: 0,
        investments: 0
    });

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const getLastWorkingDay = () => {
        let lastDayOfMonth = dayjs().endOf('month');
        while (lastDayOfMonth.day() === 0 || lastDayOfMonth.day() === 6) {
            lastDayOfMonth = lastDayOfMonth.subtract(1, 'day');
        }
        return lastDayOfMonth.format('DD MMMM YYYY');
    };

    const renewDate = getLastWorkingDay();

    const calculatePercentageChange = (items) => {
        const monthlyTotals = {};

        console.log("items", items, 'pC', percentageChanges);

        if (!Array.isArray(items)) return 0;

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

                const incomeData = loggedInUser.totals.totalIncome || [];
                const expensesData = loggedInUser.expenses || [];
                const debtsData = loggedInUser.debts || [];
                const investmentsData = loggedInUser.investments || [];

                console.log('incomeData,expensesData,debtsData,investmentsData', incomeData, expensesData, debtsData, investmentsData);

                setPercentageChanges({
                    expenses: calculatePercentageChange(expensesData),
                    debts: calculatePercentageChange(debtsData),
                    investments: calculatePercentageChange(investmentsData)
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
                        <span style={{ color: 'black' }}>
                            Next renew on <span className='credit'>{renewDate}</span>
                        </span>
                    </p>
                </div>

                <div className="expenses" id='expenses'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Expenses</h6></div>
                        <div className="section2"><img src='sprite2.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' /></div>
                    </header>
                    <p id='amount'>&#8377;<span>{expensesAmount}</span></p>
                    <p id="change" className={`infoline ${percentageChanges.expenses > 0 ? 'expense' : 'credit'}`} >
                        <span id='percentage'>{Math.abs(percentageChanges.expenses)}%</span>
                        <span className='arrow'>{percentageChanges.expenses >= 0 ? '↓'  : '↑' }</span> from last month
                    </p>
                </div>

                <div id='dets' className="debts">
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Debts</h6></div>
                        <div className="section2"><img src='sprite3.png' style={{ width: '25px', height: '25px', objectFit: 'cover' }} alt='icon' /></div>
                    </header>
                    <p id='amount'>&#8377;<span>{totalDebts}</span></p>
                    <p id="change" className={`infoline ${percentageChanges.expenses > 0 ? 'expense' : 'credit'}`} >
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
                    <p id="change" className='infoline' >
                        <span id='percentage'>{Math.abs(percentageChanges.investments)}%</span>
                        <span className='arrow'>{percentageChanges.investments >= 0 ? '↑' : '↓'}</span> from last month
                    </p>
                </div>

            </div>
        </>
    );
};

export default InfoContainer;
