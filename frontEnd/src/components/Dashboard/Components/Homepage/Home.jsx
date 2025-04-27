import React, { useEffect, useState,useRef } from 'react';
import { Layout, DatePicker, Space, message } from 'antd';
import '../../dashboardStyles.css';
import Navbar from '../Navbar';
import LoadingBorder from '../../Loadingbar';
import InfoContainer from './InfoContainer';
import ChartContainer from './ChartContainer';
import ExpensesContainer from './ExpensesContainer';
import Reminders from './Reminders';
import { getDashBoardData } from '../../../../serviceLayer/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('User');
  const [selectedRange, setSelectedRange] = useState([]);
  const [userData, setUserData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const welcomeMessageShownRef = useRef(false)

  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  console.log("loggedInUser", loggedInUser)


  useEffect(() => {

    if (!loggedInUser?.email) return;

    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getDashBoardData();
        

        const userDetails = data?.find(user => user.email === loggedInUser.email);
        

        if (userDetails) {
          setUserName(userDetails.username);
          setUserData(userDetails);
        }

      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [loggedInUser?._id]);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('welcomeShown');
    if (loggedInUser && loggedInUser.username && !hasShown) {
      messageApi.success(`Welcome ${loggedInUser.username}`, 3);
      welcomeMessageShownRef.current = true
      sessionStorage.setItem('welcomeShown', 'true');
    }
  }, [])

  const filterByDateRange = (items = []) => {
    if (!selectedRange.length) return items;
    const [start, end] = selectedRange.map(date => dayjs(date));
    return items.filter(item => {
      const itemDate = dayjs(item.date);
      return itemDate.isAfter(start) && itemDate.isBefore(end);
    });
  };

  const generatePDF = () => {
    if (!userData) {
      console.error('User data is missing.');
      return;
    }
  
    const { expenses = [], debts = [], investments = [], transactions = [], reminders = [], totals = {} } = userData;
    const { totalIncome = 0, totalExpenses = 0, totalLoans = 0, totalSavings = 0 } = totals;
  
    const filteredExpenses = filterByDateRange(expenses);
    const filteredTransactions = filterByDateRange(transactions);
  
    
    const calculatePercentageChange = (current, previous) => {
      if (!previous || previous === 0) return current === 0 ? 0 : 100;
      return ((current - previous) / previous * 100).toFixed(2);
    };
  
    
    const groupByMonth = (arr) => {
      return arr.reduce((acc, curr) => {
        const month = dayjs(curr.date).format('YYYY-MM');
        acc[month] = (acc[month] || 0) + Number(curr.amount);
        return acc;
      }, {});
    };
  
    const expensesByMonth = groupByMonth(expenses);
    const debtsByMonth = groupByMonth(debts);
    const investmentsByMonth = groupByMonth(investments);
  
    const currentMonth = dayjs().format('YYYY-MM');
    const previousMonth = dayjs().subtract(1, 'month').format('YYYY-MM');
  
    const currentExpenses = expensesByMonth[currentMonth] || 0;
    const previousExpenses = expensesByMonth[previousMonth] || 0;
    const expensesChange = calculatePercentageChange(currentExpenses, previousExpenses);
  
    const currentDebts = debtsByMonth[currentMonth] || 0;
    const previousDebts = debtsByMonth[previousMonth] || 0;
    const debtsChange = calculatePercentageChange(currentDebts, previousDebts);
  
    const currentInvestments = investmentsByMonth[currentMonth] || 0;
    const previousInvestments = investmentsByMonth[previousMonth] || 0;
    const investmentsChange = calculatePercentageChange(currentInvestments, previousInvestments);
  
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Financial Statement', 14, 20);
  
    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 14, 30);
    doc.text(`User ID: ${loggedInUser.id || loggedInUser._id}`, 14, 40);
    doc.text(`Month: ${currentMonth}`, 14, 50);
    doc.text(`Date Range: ${selectedRange.length ? selectedRange.join(' - ') : 'All Time'}`, 14, 60);
  
    autoTable(doc, {
      startY: 70,
      head: [['Category', 'Total', 'Previous Month', '% Change']],
      body: [
        ['Income', `₹${totalIncome}`, `N/A`, `N/A`], 
        ['Expenses', `₹${currentExpenses}`, `₹${previousExpenses}`, `${expensesChange}%`],
        ['Investments', `₹${currentInvestments}`, `₹${previousInvestments}`, `${investmentsChange}%`],
        ['Debts', `₹${currentDebts}`, `₹${previousDebts}`, `${debtsChange}%`],
      ],
    });
  
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Category', 'Amount']],
      body: filteredExpenses.map(exp => [dayjs(exp.date).format('YYYY-MM-DD'), exp.category, `₹${exp.amount}`]),
    });
  
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Type', 'Category', 'Amount']],
      body: filteredTransactions.map(t => [dayjs(t.date).format('YYYY-MM-DD'), t.type, t.category, `₹${t.amount}`]),
    });
  
    const now = dayjs();
    const downloadDate = now.format("DDMMYYYY_HHmmss");
    doc.save(`Financial_Statement_${downloadDate}.pdf`);
  };
  

  return (
    <>
      {isLoading && <LoadingBorder />}
      {contextHolder}
      <Layout >
        <Navbar onNavClick={() => setIsLoading(true)} />
        <Layout >
          <div className='currentUser d-flex justify-content-between align-items-center'>
            <div className='userDetails d-flex align-items-center'>
              <img alt='User Avatar' src='logo.png' style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
              <h5>Welcome <span id='loggedInUser'>{userName}</span></h5>
            </div>
            <div className='date-downloadStatement d-flex gap-2 filter'>
              <Space direction='vertical' size={12}>
                <RangePicker onChange={(dates, dateStrings) => setSelectedRange(dateStrings)} className='date-picker' />
              </Space>
              <button className='py-2' onClick={generatePDF}>Download</button>
            </div>
          </div>
        </Layout>
        <Layout>
          <Content className='my-3 bg-light p-5'>
            <InfoContainer />
          </Content>
        </Layout>
        <Layout className='charts'>
          <Content className='chartsHolder d-flex gap-4 px-3 bg-light'>
            <ChartContainer />
            <ExpensesContainer />
          </Content>
        </Layout>
        <Layout className='charts'>
          <Content className='remindersHolder my-3 px-3 bg-light'>
            <Reminders />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
