import React, { useEffect, useState } from 'react';
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


  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  console.log("loggedInUser",loggedInUser)


  useEffect(() => {

    if (!loggedInUser.email) return;

    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getDashBoardData();

        const userDetails = data?.find(user => user.email === loggedInUser.email);
        console.log("userdetails from db", userDetails)

        if (userDetails) {
          setUserName(userDetails.username);
          setUserData(userDetails);
        }

        if (loggedInUser && loggedInUser.username) {
          messageApi.success(`Welcome ${loggedInUser.username}`, 3);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [loggedInUser._id]);

  const filterByDateRange = (items = []) => {
    if (!selectedRange.length) return items;
    const [start, end] = selectedRange.map(date => dayjs(date));
    return items.filter(item => {
      const itemDate = dayjs(item.date);
      return itemDate.isAfter(start) && itemDate.isBefore(end);
    });
  };

  const generatePDF = () => {
    if (!userData || !userData.financeData) {
      console.error('Finance data is missing for the user.');
      return;
    }

    const { financeData, transactions = [], reminders = [] } = userData;
    const { currentMonth, income, expenses, investments, debts } = financeData;
    const filteredExpenses = filterByDateRange(expenses ? [expenses] : []);
    const filteredTransactions = filterByDateRange(transactions);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Financial Statement', 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 14, 30);
    doc.text(`User ID: ${loggedInUser.id}`, 14, 40);
    doc.text(`Month: ${currentMonth || 'N/A'}`, 14, 50);
    doc.text(`Date Range: ${selectedRange.length ? selectedRange.join(' - ') : 'All Time'}`, 14, 60);

    autoTable(doc, {
      startY: 70,
      head: [['Category', 'Total', 'Previous Month', '% Change']],
      body: [
        ['Income', `$${income?.total || 0}`, `$${income?.previousMonthTotal || 0}`, `${income?.percentageChange || 0}%`],
        ['Expenses', `$${expenses?.total || 0}`, `$${expenses?.previousMonthTotal || 0}`, `${expenses?.percentageChange || 0}%`],
        ['Investments', `$${investments?.total || 0}`, `$${investments?.previousMonthTotal || 0}`, `${investments?.percentageChange || 0}%`],
        ['Debts', `$${debts?.total || 0}`, `$${debts?.previousMonthTotal || 0}`, `${debts?.percentageChange || 0}%`],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Category', 'Amount']],
      body: filteredExpenses.map(exp => [exp.date, exp.category, `$${exp.amount}`]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Type', 'Category', 'Amount']],
      body: filteredTransactions.map(t => [t.date, t.type, t.category, `$${t.amount}`]),
    });

    const now = dayjs();
    const downloadDate = now.format("DDMMYYYY_HHmmss");
    doc.save(`Financial_Statement_${downloadDate}.pdf`);
  };

  return (
    <>
      {isLoading && <LoadingBorder />}
      {contextHolder}
      <Layout>
        <Navbar onNavClick={() => setIsLoading(true)} />
        <Layout>
          <div className='currentUser d-flex justify-content-between px-3 align-items-center'>
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
          <Content className='chartsHolder d-flex gap-5 p-5 bg-light'>
            <ChartContainer />
            <ExpensesContainer />
          </Content>
        </Layout>
        <Layout className='charts'>
          <Content className='remindersHolder my-3 bg-light p-5'>
            <Reminders />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
