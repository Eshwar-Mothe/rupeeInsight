import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import {
  Layout, Card, Row, Col, Typography, Form, Input, Button,
  DatePicker, Select, message, Modal
} from 'antd';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [activeInvestment, setActiveInvestment] = useState(null);

  useEffect(() => {
    const dummyData = [
      {
        title: "Mutual Fund - HDFC",
        type: "Mutual Fund",
        amount: 1500,
        date: "2025-03-15"
      },
      {
        title: "Stocks - TCS",
        type: "Stock",
        amount: 2000,
        date: "2025-04-01"
      },
      {
        title: "PPF Account",
        type: "Savings",
        amount: 1000,
        date: "2025-01-10"
      },
      {
        title: "Gold Bonds",
        type: "Bond",
        amount: 1800,
        date: "2025-02-20"
      },
      {
        title: "Real Estate Investment",
        type: "Real Estate",
        amount: 3500,
        date: "2024-12-05"
      },
      {
        title: "Crypto - Bitcoin",
        type: "Crypto",
        amount: 2200,
        date: "2025-03-01"
      }
    ];

    setInvestments(dummyData);
    calculateTotal(dummyData);
  }, []);

  const calculateTotal = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalInvestment(total);
  };

  const onFinish = (values) => {
    const newInvestment = {
      title: values.title,
      type: values.type === "Others" ? values.customType : values.type,
      amount: parseFloat(values.amount),
      date: values.date.format("YYYY-MM-DD")
    };

    const updatedInvestments = [...investments, newInvestment];
    setInvestments(updatedInvestments);
    calculateTotal(updatedInvestments);
    message.success("Investment added successfully!");
    form.resetFields();
    setSelectedType("");
  };

  const handleViewDetails = (investment) => {
    setActiveInvestment(investment);
    setOpenModal(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ margin: '20px' }}>
        <Title level={3}>Investments Page</Title>

        <Card style={{ marginBottom: '20px' }}>
          <Title level={5}>Total Investment: ₹{totalInvestment}</Title>
        </Card>

        <Card title="Add New Investment" style={{ marginBottom: '30px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16} className='align-items-center'>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="title"
                  label="Investment Title"
                  rules={[{ required: true, message: "Please enter investment title" }]}
                >
                  <Input placeholder="Eg. Stocks - Reliance" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: "Please select investment type" }]}
                >
                  <Select
                    placeholder="Select type"
                    onChange={(value) => {
                      if (value === "Others") {
                        form.setFieldsValue({ customType: '' });
                      }
                      setSelectedType(value);
                    }}
                  >
                    <Option value="Stock">Stock</Option>
                    <Option value="Mutual Fund">Mutual Fund</Option>
                    <Option value="Bond">Bond</Option>
                    <Option value="Crypto">Crypto</Option>
                    <Option value="Savings">Savings</Option>
                    <Option value="Real Estate">Real Estate</Option>
                    <Option value="Others">Others</Option>
                  </Select>
                </Form.Item>
              </Col>

              {selectedType === "Others" && (
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="customType"
                    label="Custom Type"
                    rules={[{ required: true, message: "Please enter custom type" }]}
                  >
                    <Input placeholder="Enter custom investment type" />
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} sm={12} md={4}>
                <Form.Item
                  name="amount"
                  label="Amount (₹)"
                  rules={[{ required: true, message: "Enter amount" }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={4}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: "Select date" }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className='filter text-center'>
              <Button htmlType="submit" style={{ padding: '1.5rem 2rem' }}>Add Investment</Button>
            </Form.Item>
          </Form>
        </Card>

        <Row gutter={[16, 16]}>
          {investments.map((inv, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className='filter' title={inv.title} variant='filled' hoverable extra={<Button  onClick={() => handleViewDetails(inv)}>View Details</Button>}>
                <p><Text strong>Type:</Text> {inv.type}</p>
                <p><Text strong>Amount:</Text> ₹{inv.amount}</p>
                <p><Text strong>Date:</Text> {inv.date}</p>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          open={openModal}
          title="Investment Details"
          onCancel={() => setOpenModal(false)}
          footer={[
            <Button key="close" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          ]}
        >
          {activeInvestment && (
            <>
              <p><Text strong>Title:</Text> {activeInvestment.title}</p>
              <p><Text strong>Type:</Text> {activeInvestment.type}</p>
              <p><Text strong>Amount:</Text> ₹{activeInvestment.amount}</p>
              <p><Text strong>Date:</Text> {activeInvestment.date}</p>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default Investments;
