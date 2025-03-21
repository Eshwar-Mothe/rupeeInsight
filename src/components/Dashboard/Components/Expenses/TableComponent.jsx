import React, { useState } from 'react';
import { Space, Table, Button, Modal, Form, Input, Select, DatePicker } from 'antd';


const dataSource = Array.from({ length: 2 }).map((_, i) => ({
  key: i,
  transactionName: 'Subscription',
  reminder_title: 'Amazon',
  reminder_duration: 'Yearly',
  reminder_dueDate: '10/05/2025',
  amount: '₹1600',
}));

const TableComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [reminders, setReminders] = useState(dataSource);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleNewReminder = () => {
    setIsModalOpen(true);
  }

  const handleSaveReminder = () => {
    form
      .validateFields()
      .then((values) => {
        const newReminder = {
          key: reminders.length + 1,
          transactionName: values.transactionName,
          reminder_title: values.reminderTitle,
          reminder_duration: values.reminderDuration,
          reminder_dueDate: values.reminderDueDate.format("DD/MM/YYYY"),
          amount: `₹${values.amount}`,
        };

        setReminders([...reminders, newReminder]);

        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((error) => console.log("Validation Failed:", error));
  };


  const columns = [
    
    { title: "Reminder", dataIndex: "transactionName", key: "transactionName", className: 'text-center',},
    
    { title: "Title", dataIndex: "reminder_title", key: "reminder_title", className: 'text-center',},
    
    { title: "Duration", dataIndex: "reminder_duration", key: "reminder_duration", className: 'text-center',},
    
    { title: "Due Date", dataIndex: "reminder_dueDate", key: "reminder_dueDate", className: 'text-center',},
    
    { title: "Amount (₹)", dataIndex: "amount", key: "amount", className: 'text-center',},
    {
      title: "Action",
      key: "action",
      className: 'text-center',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Mark as Completed</Button>
          <Button>Snooze</Button>
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <header className='d-flex justify-content-between align-items-center gap-1 my-2 px-3'>
          <div className="section1">
            <h5>Reminders Table</h5>
          </div>
          <div className="section2 filter">
            <button onClick={handleNewReminder}>Add New</button>
          </div>
        </header>
        <div className="expensestable container bg-light"></div>
        <Table
          columns={columns}
          dataSource={reminders}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: reminders.length,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />

        {/* New Reminder */}
        <Modal
          title="Add New Reminder"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleSaveReminder}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Transaction Name"
              name="transactionName"
              rules={[{ required: true, message: "Enter transaction name" }]}
            >
              <Input placeholder="e.g., Subscription, Rent, Loan Payment" />
            </Form.Item>

            <Form.Item
              label="Reminder Title"
              name="reminderTitle"
              rules={[{ required: true, message: "Enter reminder title" }]}
            >
              <Input placeholder="e.g., Amazon, Netflix, Electricity Bill" />
            </Form.Item>

            <Form.Item
              label="Reminder Duration"
              name="reminderDuration"
              rules={[{ required: true, message: "Select duration" }]}
            >
              <Select placeholder="Select duration">
                <Option value="Daily">Daily</Option>
                <Option value="Weekly">Weekly</Option>
                <Option value="Monthly">Monthly</Option>
                <Option value="Yearly">Yearly</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Due Date"
              name="reminderDueDate"
              rules={[{ required: true, message: "Select due date" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Amount (₹)"
              name="amount"
              rules={[{ required: true, message: "Enter amount" }]}
            >
              <Input  placeholder="Enter amount" />
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </>
  );
};

export default TableComponent;
