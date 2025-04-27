import { Layout, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Content } from 'antd/es/layout/layout';
import DoughnutChart from './DoughnutChart';
import TableComponent from './TableComponent';
import BarChart from './BarChart';
import PolarChart from './PolarChart';
import ExpensesTable from './ExpensesTable';
import LineChart from './LineChart';

const Expenses = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    useEffect(() => {
        const currentMonth = new Date().toLocaleString("default", { month: "long" });
        setSelectedMonth(currentMonth);
        // console.log("selected",selectedMonth)
    }, []);

    

    return (
        <Layout>
            <Navbar />
            <Layout>
                <header className='d-flex justify-content-between align-items-center gap-4 my-2 px-2'>
                    <div className="section1">
                        <h4>Overview</h4>
                    </div>
                    <div className="section2 d-flex align-items-center gap-2 filter">
                        <h6 className='my-1'>Filter:</h6>
                        <Select
                            placeholder="Select Month"
                            style={{ width: 150 }}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            {months.map((month, index) => (
                                <Select.Option key={index} value={month}>
                                    {month}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </header>

                <Content className='text-center d-flex gap-4 align-items-center justify-content-evenly flex-wrap my-2 bg-light'>
                    <DoughnutChart title="Home Needs" selectedMonth={selectedMonth}/>
                    <LineChart title="Health Expenses" selectedMonth={selectedMonth}/>
                    <BarChart title="Travel Expenses" selectedMonth={selectedMonth}/>
                    <PolarChart title="Entertainment Expenses" selectedMonth={selectedMonth}/>
                </Content>

                <Content className='my-5 w-100'>
                    <ExpensesTable />
                </Content>

                <Content className='w-100 bg-light'>
                    <TableComponent />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Expenses;
