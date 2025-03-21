import { Layout } from 'antd'
import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Content } from 'antd/es/layout/layout'
import DoughnutChart from './DoughnutChart'
import TableComponent from './TableComponent'
import ExpensesContainer from '../Homepage/ExpensesContainer'
import { Select } from "antd";
import BarChart from './BarChart'
import PolarChart from './PolarChart'
import RadarChart from './LineChart'
import ExpensesTable from './ExpensesTable'

const Expenses = () => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleMonthChange = (value) => {
        console.log("Selected Month:", value);

    };

    return (
        <>
            <Layout>
                <Navbar />
                <Layout>
                    <header className='d-flex justify-content-between align-items-center gap-4 my-2 px-2'>
                        <div className="section1">
                            <h4>Overview</h4>
                        </div>
                        <div className="section2 d-flex align-items-center gap-2">
                            <h6 className='my-1'>Filter:</h6>
                            <Select
                                placeholder="Select Month"
                                style={{ width: 150 }}
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
                    <Content className='text-center doughnutChart d-flex gap-4 align-items-center justify-content-center flex-wrap my-2 bg-light'>
                        <DoughnutChart title="Home Needs" labels={["Groceries", "Rent", "Furniture", "Utilities", "Maintenance"]} />
                        <RadarChart title="Health" labels={["Doctor Visits", "Medicines", "Insurance", "Gym", "Therapy"]} />
                        <BarChart title="Travel" labels={["Flights", "Hotels", "Transport", "Food", "Activities"]} />
                        <PolarChart title="Expense Distribution" labels={["Flights", "Hotels", "Transport", "Food", "Activities"]} />
                    </Content>
                </Layout>

                <Layout>
                    <Content className='my-5 w-100'>
                        <ExpensesTable />
                    </Content>
                </Layout>
                <Layout>
                    <Content className='w-100 bg-light'>
                        <TableComponent />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default Expenses