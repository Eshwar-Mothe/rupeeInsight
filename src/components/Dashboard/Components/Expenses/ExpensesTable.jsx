import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";

const { Option } = Select;

const ExpensesTable = () => {
    const [expenses, setExpenses] = useState([
        { id: 1, category: "Food", amount: 1200, date: "2025-03-15", paymentMethod: "Credit Card" },
        { id: 2, category: "Transport", amount: 800, date: "2025-03-12", paymentMethod: "Cash" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleAddExpense = (values) => {
        const newExpense = {
            id: expenses.length + 1,
            ...values,
            date: values.date.format("YYYY-MM-DD"),
        };
        setExpenses([...expenses, newExpense]);
        handleCancel();
    };


    const columns = [
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Amount (₹)", dataIndex: "amount", key: "amount", render: (amount) => `₹${amount}` },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
    ];

    return (
        <div className="expenses-container">
            <div className="header d-flex justify-content-between align-items-center px-3 filter">
                <h2>Expenses</h2>
                <Button onClick={showModal}>+ Add Expense</Button>
            </div>
            <Table dataSource={expenses} columns={columns} rowKey="id" />
            <Modal
                title="Add New Expense"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleAddExpense}>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please enter a category" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
                        <InputNumber min={1} className="w-100" />
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                        <DatePicker className="w-100" />
                    </Form.Item>
                    <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select a payment method" }]}>
                        <Select>
                            <Option value="Cash">Cash</Option>
                            <Option value="Credit Card">Credit Card</Option>
                            <Option value="Bank Transfer">Bank Transfer</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ExpensesTable;
