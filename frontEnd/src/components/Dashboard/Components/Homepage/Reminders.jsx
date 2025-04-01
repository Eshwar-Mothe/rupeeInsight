import React from 'react';
import { Table, Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const remindersData = [
    {
        key: '1',
        sNo: '01',
        reminderCategory: 'Subscriptions',
        reminderTitle: 'Amazon Prime',
        reminderDuration: 'Yearly',
        dueDate: '10/05/2025',
        price: '₹1600/-',
    },
    {
        key: '2',
        sNo: '02',
        reminderCategory: 'Subscriptions',
        reminderTitle: 'Netflix',
        reminderDuration: 'Monthly',
        dueDate: '21/03/2025',
        price: '₹600/-',
    },
    {
        key: '3',
        sNo: '03',
        reminderCategory: 'Recharge',
        reminderTitle: 'Postpaid',
        reminderDuration: 'Yearly',
        dueDate: '16/05/2025',
        price: '₹1100/-',
    },
    {
        key: '4',
        sNo: '04',
        reminderCategory: 'Insurance',
        reminderTitle: 'Health',
        reminderDuration: 'Monthly',
        dueDate: '26/12/2025',
        price: '₹6000/-',
    },
    {
        key: '5',
        sNo: '05',
        reminderCategory: 'Loan',
        reminderTitle: 'Muthoot Gold Finance',
        reminderDuration: 'Monthly',
        dueDate: '06/06/2025',
        price: '₹2000/-',
    },
];

const Reminders = () => {
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sNo',
            key: 'sNo',
        },
        {
            title: 'Category',
            dataIndex: 'reminderCategory',
            key: 'reminderCategory',
            className: 'text-center',
        },
        {
            title: 'Title',
            dataIndex: 'reminderTitle',
            key: 'reminderTitle',
            className: 'text-center',

        },
        {
            title: 'Duration',
            dataIndex: 'reminderDuration',
            key: 'reminderDuration',
            className: 'text-center',
            render: (text) => (
                <span className={text === 'Yearly' ? 'yearly' : text === 'Monthly' ? 'monthly' : ''}>
                    {text}
                </span>
            )
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            className: 'text-center',
        },
        {
            title: 'Amount (₹)',
            dataIndex: 'price',
            key: 'price',
            className: 'text-center',
        },
        {
            title: 'Actions',
            key: 'actions',
            className: 'text-center',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='antd-button'>Payment Done</Button>
                    <Button className='antd-button'>Snooze</Button>
                    <Button className='antd-button'>Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="reminders py-3">
            <header className="d-flex justify-content-between align-items-center gap-5 my-2 px-3 filter">
                <h2>Reminders</h2>
                <Link to="/expenses">
                    <Button>View All</Button>
                </Link>
            </header>

            <Table
                columns={columns}
                dataSource={remindersData}
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content" }}
            />
        </div>
    );
};

export default Reminders;
