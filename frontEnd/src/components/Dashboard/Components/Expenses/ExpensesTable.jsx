import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";
import { postExpensesData, getExpensesData } from "../../../../serviceLayer/api"; // Add API call to fetch expenses

const { Option } = Select;

const ExpensesTable = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subOptions, setSubOptions] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const categories = {
        Home: ["Groceries", "Rent", "Furniture", "Utilities", "Maintenance", "Others"],
        Health: ["Doctor Visits", "Medicines", "Insurance", "Gym", "Therapy", "Others"],
        Travel: ["Flights", "Hotels", "Transport", "Food", "Activities", "Others"],
        Entertainment: ["Movies", "Concerts", "Streaming Services", "Gaming", "Events", "Others"],
        Others: [],
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await getExpensesData(loggedInUser._id); // Fetch expenses from backend
            setExpenses(response || []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleAddExpense = async (values) => {
        try {
            const newExpense = {  
                category: values.category === "Others" ? values.customCategory : values.category,
                subcategory: values.subcategory === "Others" ? values.customSubCategory : values.subcategory,
                amount: values.amount,
                date: values.date.format("YYYY-MM-DD"),
                paymentMethod: values.paymentMethod,
                note: values.note?.trim() || "",
                type: "expense",
                userId: loggedInUser._id
            };
            console.log(newExpense);
            await postExpensesData(newExpense);
            setExpenses(prev => [...prev, newExpense]);
            handleCancel();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const handleCategory = (value) => {
        setSelectedCategory(value);
        setSubOptions(categories[value] || []);
        setSelectedSubCategory("");
    };

    const columns = [
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Sub Category", dataIndex: "subcategory", key: "subcategory" },
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

            <Table dataSource={expenses} columns={columns} rowKey={(record) => record._id || record.date} scroll={{ x: "max-content" }} />

            <Modal title="Add New Expense" open={isModalOpen} onCancel={handleCancel} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleAddExpense} autoComplete="off">
                  
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please Select a category" }]}>
                        <Select onChange={handleCategory} value={selectedCategory} placeholder="Select Category">
                            {Object.keys(categories).map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {selectedCategory && subOptions.length > 0 && (
                        <Form.Item label="Sub Category" name="subcategory" rules={[{ required: true, message: "Please Select a subcategory" }]}>
                            <Select onChange={(value) => setSelectedSubCategory(value)} value={selectedSubCategory} placeholder="Select Subcategory">
                                {subOptions.map((sub, index) => (
                                    <Option key={index} value={sub}>
                                        {sub}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                  
                    {selectedCategory === "Others" && (
                        <Form.Item label="Custom Category" name="customCategory" rules={[{ required: true, message: "Please enter a category" }]}>
                            <Input placeholder="Enter Custom Category" />
                        </Form.Item>
                    )}

                  
                    {selectedSubCategory === "Others" && (
                        <Form.Item label="Custom Subcategory" name="customSubCategory" rules={[{ required: true, message: "Please enter a subcategory" }]}>
                            <Input placeholder="Enter Custom Subcategory" />
                        </Form.Item>
                    )}

                  
                    <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
                        <InputNumber min={1} className="w-100" />
                    </Form.Item>

                  
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                        <DatePicker className="w-100" />
                    </Form.Item>

                  
                    <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select a payment method" }]}>
                        <Select placeholder="Select Payment Method">
                            <Option value="Cash">Cash</Option>
                            <Option value="Credit Card">Credit Card</Option>
                            <Option value="Bank Transfer">Bank Transfer</Option>
                        </Select>
                    </Form.Item>

                  
                    <Form.Item label="Note (Optional)" name="note">
                        <Input.TextArea rows={2} placeholder="Add a note (optional)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ExpensesTable;
