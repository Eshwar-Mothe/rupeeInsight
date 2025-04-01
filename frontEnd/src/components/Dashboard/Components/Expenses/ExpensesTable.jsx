import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";
import { postExpensesData } from "../../../../serviceLayer/api";

const { Option } = Select;

const ExpensesTable = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subOptions, setSubOptions] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const categories = {
        Home: ["Groceries", "Rent", "Furniture", "Utilities", "Maintenance", "Others"],
        Health: ["Doctor Visits", "Medicines", "Insurance", "Gym", "Therapy", "Others"],
        Travel: ["Flights", "Hotels", "Transport", "Food", "Activities", "Others"],
        Entertainment: ["Movies", "Concerts", "Streaming Services", "Gaming", "Events", "Others"],
        Others: [],
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
                id: Date.now(),  
                type: "expense",
                category: values.category === "Others" ? values.customCategory : values.category,
                subcategory: values.subcategory === "Others" ? values.customSubCategory : values.subcategory,
                amount: values.amount,
                date: values.date.format("YYYY-MM-DD"),
                paymentMethod: values.paymentMethod,
                note: values.note?.trim() || "",
            };
            setExpenses(prev => [...prev, newExpense]);
            handleCancel();
            await postExpensesData(newExpense);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };
    

    const handleCategory = (value) => {
        setSelectedCategory(value);
        setSubOptions(categories[value] || []);
        setSelectedSubCategory("");
    };

    useEffect(() => {
        console.log("Updated subOptions:", subOptions);
    }, [subOptions]);

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

            <Table dataSource={expenses} columns={columns} rowKey="id" scroll={{ x: "max-content" }} />

            <Modal title="Add New Expense" open={isModalOpen} onCancel={handleCancel} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleAddExpense} autoComplete="off">
                    {/* Category Selection */}
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please Select a category" }]}>
                        <Select onChange={handleCategory} value={selectedCategory} placeholder="Select Category">
                            {Object.keys(categories).map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Dynamic Subcategory Selection */}
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

                    {/* Custom Category Input */}
                    {selectedCategory === "Others" && (
                        <Form.Item label="Custom Category" name="customCategory" rules={[{ required: true, message: "Please enter a category" }]}>
                            <Input placeholder="Enter Custom Category" />
                        </Form.Item>
                    )}

                    {/* Custom Subcategory Input */}
                    {selectedSubCategory === "Others" && (
                        <Form.Item label="Custom Subcategory" name="customSubCategory" rules={[{ required: true, message: "Please enter a subcategory" }]}>
                            <Input placeholder="Enter Custom Subcategory" />
                        </Form.Item>
                    )}

                    {/* Amount Input */}
                    <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
                        <InputNumber min={1} className="w-100" />
                    </Form.Item>

                    {/* Date Picker */}
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                        <DatePicker className="w-100" />
                    </Form.Item>

                    {/* Payment Method Selection */}
                    <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select a payment method" }]}>
                        <Select placeholder="Select Payment Method">
                            <Option value="Cash">Cash</Option>
                            <Option value="Credit Card">Credit Card</Option>
                            <Option value="Bank Transfer">Bank Transfer</Option>
                        </Select>
                    </Form.Item>

                    {/* Additional Note (Optional) */}
                    <Form.Item label="Note (Optional)" name="note">
                        <Input.TextArea rows={2} placeholder="Add a note (optional)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ExpensesTable;
