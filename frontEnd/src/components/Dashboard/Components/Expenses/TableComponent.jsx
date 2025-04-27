import React, { useEffect, useState } from 'react';
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from 'antd';
import { postRemindersData } from '../../../../serviceLayer/api';
import dayjs from 'dayjs';

const { Option } = Select;

const TableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const durationOrder = {
    Daily: 1,
    Weekly: 2,
    Monthly: 3,
    Yearly: 4,
  };

  useEffect(() => {
    if (loggedInUser && Array.isArray(loggedInUser.reminders)) {
      const userReminders = loggedInUser.reminders.map((item, index) => ({
        ...item,
        reminderDueDate: dayjs(item.reminderDueDate).format('DD/MM/YYYY'),
        key: index,
      }));
      setReminders(userReminders);
    }
  }, []);

  const handleNewReminder = () => {
    setIsModalOpen(true);
  };

  const handleSaveReminder = async () => {
    try {
      const values = await form.validateFields();

      const newReminder = {
        userId: loggedInUser._id,
        reminderCategory: values.reminderCategory,
        reminderTitle: values.reminderTitle,
        reminderDuration: values.reminderDuration,
        reminderDueDate: values.reminderDueDate.format('DD/MM/YYYY'),
        amount: values.amount,
        type: 'reminder',
        isCompleted: false,
        isSnoozed: false,
        isDeleted: false,
        key: reminders.length,
      };

      await postRemindersData(newReminder);

      const updatedReminders = [...reminders, newReminder];
      setReminders(updatedReminders);

      const updatedUser = { ...loggedInUser, reminders: updatedReminders };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      messageApi.success('Reminder added successfully!', 2);
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation Failed or API Error:', error);
      messageApi.error('Failed to add reminder. Try again.', 2);
    }
  };

  const handlePayment = () => {
    try {
      console.log('Executing Payment');
      messageApi.success('Marked as payment Done', 2);
    } catch (error) {
      console.log('Error in payment the reminder', error);
      messageApi.error('Failed to mark as payment, try again..!');
    }
  };

  const handleSnooze = () => {
    try {
      console.log('Executing snooze');
      messageApi.warning('Notifications paused for 4 weeks', 2);
    } catch (error) {
      console.log('Error in snoozing the reminder', error);
      messageApi.error('Failed to snooze, try again..!');
    }
  };

  const handelEdit = () => {
    try {
      console.log('Executing Editing');
      messageApi.loading('Loading..please wait', 2);
    } catch (error) {
      console.log('Error in <Edit></Edit> the reminder', error);
      messageApi.error('Failed to Edit, try again..!');
    }
  };

  const handleDelete = () => {
    try {
      messageApi.loading('Performing Delete Operation', 2);
      console.log('Executing Delete');
    } catch (error) {
      console.log('Error in Delete the reminder', error);
      messageApi.error('Failed to Delete, try again..!');
    }
  };

  const columns = [
    {
      title: 'Reminder',
      dataIndex: 'reminderCategory',
      key: 'reminderCategory',
      className: 'text-center',
      sorter: (a, b) => a.reminderCategory.localeCompare(b.reminderCategory),
    },
    {
      title: 'Title',
      dataIndex: 'reminderTitle',
      key: 'reminderTitle',
      className: 'text-center',
      sorter: (a, b) => a.reminderTitle.localeCompare(b.reminderTitle),
    },
    {
      title: 'Duration',
      dataIndex: 'reminderDuration',
      key: 'reminderDuration',
      className: 'text-center',
      sorter: (a, b) =>
        durationOrder[a.reminderDuration] - durationOrder[b.reminderDuration],
    },
    {
      title: 'Due Date',
      dataIndex: 'reminderDueDate',
      key: 'reminderDueDate',
      className: 'text-center',
      sorter: (a, b) =>
        dayjs(a.reminderDueDate, 'DD/MM/YYYY').unix() -
        dayjs(b.reminderDueDate, 'DD/MM/YYYY').unix(),
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      className: 'text-center',
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    },
    {
      title: 'Action',
      key: 'action',
      className: 'text-center',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={handlePayment}>Payment Completed</Button>
          <Button onClick={handleSnooze}>Snooze</Button>
          <Button onClick={handelEdit}>Edit</Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div>
        <header className="d-flex justify-content-between align-items-center gap-1 my-2 px-3">
          <div className="section1">
            <h5>Reminders Table</h5>
          </div>
          <div className="section2 filter">
            <button onClick={handleNewReminder}>Add New</button>
          </div>
        </header>
      </div>

      <div className="expensestable container bg-light"></div>
      <Table
        scroll={{ x: 'max-content' }}
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

      {/* New Reminder Modal */}
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
            rules={[{ required: true, message: 'Enter Reminder Category' }]}
          >
            <Input placeholder="e.g., Subscription, Rent, Loan Payment" />
          </Form.Item>

          <Form.Item
            label="Reminder Title"
            name="reminderTitle"
            rules={[{ required: true, message: 'Enter reminder title' }]}
          >
            <Input placeholder="e.g., Amazon, Netflix, Electricity Bill" />
          </Form.Item>

          <Form.Item
            label="Reminder Duration"
            name="reminderDuration"
            rules={[{ required: true, message: 'Select duration' }]}
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
            rules={[{ required: true, message: 'Select due date' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Amount (₹)"
            name="amount"
            rules={[{ required: true, message: 'Enter amount' }]}
          >
            <Input placeholder="Enter amount" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableComponent;
