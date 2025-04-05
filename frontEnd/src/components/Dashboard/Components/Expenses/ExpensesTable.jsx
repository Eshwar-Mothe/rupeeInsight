import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Select,
    message,
    Popconfirm
} from "antd";
import {
    postExpensesData,
    getExpensesData
} from "../../../../serviceLayer/api";

const { Option } = Select;

const ExpensesTable = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subOptions, setSubOptions] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const categories = {
        Home: ["Groceries", "Rent", "Furniture", "Utilities", "Maintenance", "Others"],
        Health: ["Doctor Visits", "Medicines", "Insurance", "Gym", "Therapy", "Others"],
        Travel: ["Flights", "Hotels", "Transport", "Food", "Activities", "Others"],
        Entertainment: ["Movies", "Concerts", "Streaming Services", "Gaming", "Events", "Others"],
        Others: []
    };

    // Load expenses from localStorage on first render
    useEffect(() => {
        if (loggedInUser && Array.isArray(loggedInUser.expenses)) {
            const userExpenses = loggedInUser.expenses.map((item, index) => ({
                ...item,
                date: dayjs(item.date).format("DD/MM/YYYY"),
                key: index,
            }));
            setExpenses(userExpenses);
        }
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await getExpensesData(loggedInUser._id);
            if (Array.isArray(response)) {
                setExpenses(response);
            } else if (Array.isArray(response?.data)) {
                setExpenses(response.data);
            } else {
                console.warn("Unexpected response format for expenses:", response);
                setExpenses([]);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenses([]);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        form.resetFields();
    };

    const handleAddExpense = async (values) => {
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

        if (isEditing) {
            const updatedList = expenses.map((item) =>
                item.key === editingRecord.key ? { ...item, ...newExpense, date: dayjs(newExpense.date).format("DD/MM/YYYY") } : item
            );
            setExpenses(updatedList);
            // await postExpensesData(updatedList)
            messageApi.success("Expense updated successfully!");
        } else {
            const updatedExpense = [
                ...expenses,
                { ...newExpense, date: dayjs(newExpense.date).format("DD/MM/YYYY"), key: expenses.length }
            ];
            setExpenses(updatedExpense);
            messageApi.success("Expense added successfully!");
        }

        await postExpensesData(newExpense)
        
        const updatedUser = { ...loggedInUser, expenses: expenses };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        form.resetFields();
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleEdit = (record) => {
        setIsEditing(true);
        setIsModalOpen(true);
        setEditingRecord(record);
        setSelectedCategory(record.category);
        setSelectedSubCategory(record.subcategory);
        form.setFieldsValue({
            ...record,
            date: dayjs(record.date, "DD/MM/YYYY"),
        });
        setSubOptions(categories[record.category] || []);
    };

    const handleDelete = (record) => {
        console.log("am coming to delete")
        Modal.confirm({
            title: "Are you sure you want to delete this expense?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => {
                const updatedList = expenses.filter((item) => item.key !== record.key);
                setExpenses(updatedList);
                messageApi.success("Expense deleted successfully!");

                const updatedUser = { ...loggedInUser, expenses: updatedList };
                localStorage.setItem("user", JSON.stringify(updatedUser));
            },
        });
    };

    const handleCategory = (value) => {
        setSelectedCategory(value);
        setSubOptions(categories[value] || []);
        setSelectedSubCategory("");
        form.setFieldsValue({ subcategory: undefined });
    };

    const columns = [
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Sub Category", dataIndex: "subcategory", key: "subcategory" },
        {
            title: "Amount (₹)",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `₹${amount}`
        },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger type="link" onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </>
            )
        }
    ];

    return (
        <div className="expenses-container">
            {contextHolder}

            <div className="header d-flex justify-content-between align-items-center px-3 filter">
                <h2>Expenses</h2>
                <Button onClick={showModal}>+ Add Expense</Button>
            </div>

            <Table
                dataSource={expenses}
                columns={columns}
                rowKey={(record) => record._id || record.key}
                scroll={{ x: "max-content" }}
            />

            <Modal
                title={isEditing ? "Edit Expense" : "Add New Expense"}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddExpense}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select onChange={handleCategory} placeholder="Select Category">
                            {Object.keys(categories).map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {selectedCategory && subOptions.length > 0 && (
                        <Form.Item
                            label="Sub Category"
                            name="subcategory"
                            rules={[{ required: true, message: "Please select a subcategory" }]}
                        >
                            <Select
                                onChange={(value) => setSelectedSubCategory(value)}
                                placeholder="Select Subcategory"
                            >
                                {subOptions.map((sub, index) => (
                                    <Option key={index} value={sub}>
                                        {sub}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {selectedCategory === "Others" && (
                        <Form.Item
                            label="Custom Category"
                            name="customCategory"
                            rules={[{ required: true, message: "Please enter a category" }]}
                        >
                            <Input placeholder="Enter Custom Category" />
                        </Form.Item>
                    )}

                    {selectedSubCategory === "Others" && (
                        <Form.Item
                            label="Custom Subcategory"
                            name="customSubCategory"
                            rules={[{ required: true, message: "Please enter a subcategory" }]}
                        >
                            <Input placeholder="Enter Custom Subcategory" />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: "Please enter an amount" }]}
                    >
                        <InputNumber min={1} className="w-100" />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: "Please select a date" }]}
                    >
                        <DatePicker className="w-100" />
                    </Form.Item>

                    <Form.Item
                        label="Payment Method"
                        name="paymentMethod"
                        rules={[{ required: true, message: "Please select a payment method" }]}
                    >
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
