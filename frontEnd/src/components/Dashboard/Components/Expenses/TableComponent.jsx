import React, { useState } from 'react';
import { Space, Table, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { postRemindersData } from '../../../../serviceLayer/api';


const dataSource = Array.from({ length: 2 }).map((_, i) => ({
  key: i,
  reminderCategory: 'Subscription',
  reminderTitle: 'Amazon',
  reminderDuration: 'Yearly',
  reminderDueDate: '10/05/2025',
  amount: '₹1600',
}));

const TableComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [reminders, setReminders] = useState(dataSource);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  const handleNewReminder = () => {
    setIsModalOpen(true);
  }

  const handleSaveReminder = () => {
    form
      .validateFields()
      .then((values) => {
        const newReminder = {
          userId: loggedInUser._id,
          reminderCategory: values.reminderCategory,
          reminderTitle: values.reminderTitle,
          reminderDuration: values.reminderDuration,
          reminderDueDate: values.reminderDueDate.format("DD/MM/YYYY"),
          amount: values.amount,
          type: 'reminder',
          isCompleted: false,
          isSnoozed: false,
          isDeleted: false,
          key: reminders.length + 1,
        };

        setReminders([...reminders, newReminder]);
        postRemindersData(newReminder)

        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((error) => console.log("Validation Failed:", error));
  };


  const columns = [
    
    { title: "Reminder", dataIndex: "reminderCategory", key: "reminderCategory", className: 'text-center',},
    
    { title: "Title", dataIndex: "reminderTitle", key: "reminderTitle", className: 'text-center',},
    
    { title: "Duration", dataIndex: "reminderDuration", key: "reminderDuration", className: 'text-center',},
    
    { title: "Due Date", dataIndex: "reminderDueDate", key: "reminderDueDate", className: 'text-center',},
    
    { title: "Amount (₹)", dataIndex: "amount", key: "amount", className: 'text-center',},
    {
      title: "Action",
      key: "action",
      className: 'text-center',
      render: (_, record) => (
        <Space size="middle">
          <Button>Mark as Completed</Button>
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
          scroll={{ x: "max-content" }}
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
              label="reminderCategory"
              name="reminderCategory"
              rules={[{ required: true, message: "Enter Reminder Category" }]}
              
            >
              <Input placeholder="e.g., Subscription, Rent, Loan Payment"/>
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
