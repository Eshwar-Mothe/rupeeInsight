import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

const DebtTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [loans, setLoans] = useState([
        { key: 1, type: "Bank Loan", amount: 500000, remaining: 300000, repayment: 20000, recommended: 25000, increase: 5, tenure: 60 },
        { key: 2, type: "Gold Loan", amount: 200000, remaining: 120000, repayment: 8000, recommended: 10000, increase: 3, tenure: 36 },
        { key: 3, type: "Car Loan", amount: 300000, remaining: 180000, repayment: 12000, recommended: 15000, increase: 6, tenure: 48 },
        { key: 4, type: "Home Loan", amount: 1000000, remaining: 700000, repayment: 35000, recommended: 40000, increase: 4, tenure: 120 },
        { key: 5, type: "Personal Loan", amount: 150000, remaining: 90000, repayment: 10000, recommended: 12000, increase: 7, tenure: 24 }
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            setLoans([...loans, { key: loans.length + 1, ...values }]);
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        { title: "Loan Type", dataIndex: "type", key: "type", className: "text-center " },
        { title: "Actual Amount (₹)", dataIndex: "amount", key: "amount", className: "text-center fw-bold" },
        { title: "Remaining Balance (₹)", dataIndex: "remaining", key: "remaining", className: "text-center" },
        { title: "Loan Repayment (₹)", dataIndex: "repayment", key: "repayment", className: "text-center" },
        { title: "Recommended Payment (₹)", dataIndex: "recommended", key: "recommended", className: "text-center" },
        { title: "Increase %", dataIndex: "increase", key: "increase", className: "text-center" },
        { title: "Tenure (months)", dataIndex: "tenure", key: "tenure", className: "text-center fw-bold" },
    ];

    return (
        <>
            <div>
                <header className="filter d-flex justify-content-between my-2">
                    <div className="section1">
                        <h3>Loans Table</h3>
                    </div>
                    <div>
                        <Button className="filter" onClick={showModal}>Add New Loan</Button>
                    </div>
                </header>
                <Table dataSource={loans} columns={columns} pagination={true} scroll={{ x: "max-content" }}/>

                <Modal title="Add New Loan" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form form={form} layout="vertical">
                        <Form.Item name="type" label="Loan Type" rules={[{ required: true, message: "Please enter loan type" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="amount" label="Actual Amount" rules={[{ required: true, message: "Enter amount" }]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="remaining" label="Remaining Balance" rules={[{ required: true, message: "Enter remaining balance" }]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="repayment" label="Loan Repayment" rules={[{ required: true, message: "Enter repayment amount" }]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="recommended" label="Recommended Payment" rules={[{ required: true, message: "Enter recommended payment" }]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="increase" label="Increase %" rules={[{ required: true, message: "Enter increase percentage" }]}>
                            <InputNumber min={0} max={100} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="tenure" label="Tenure (months)" rules={[{ required: true, message: "Enter tenure" }]}>
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default DebtTable;
