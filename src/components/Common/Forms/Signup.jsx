import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';

const Signup = () => {

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    jobTitle: '',
    income: '',
    debt: '',
    savings: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User Details:', userDetails);

  };

  return (
    <>
          <NavBar />
      <div className="signup-container container w-50">

        <h1 className='text-center'>Sign Up</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input name="name" value={userDetails.name} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input name="email" value={userDetails.email} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password name="password" value={userDetails.password} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please enter your Job Title' }]}>
            <Input name="jobTitle" value={userDetails.jobTitle} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Income" name="income" rules={[{ required: true, message: 'Please enter your income' }]}>
            <Input type="number" name="income" value={userDetails.income} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Debt" name="debt" rules={[{ required: false, message: 'Please enter your debts (if any)' }]}>
            <Input type="number" name="debt" value={userDetails.debt} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item label="Savings" name="savings">
            <Input type="number" name="savings" value={userDetails.savings} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item>
            <Button className='submit' htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <div>
            <span>Existing User?<Link to="/signin" className='link'> Sign In</Link></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;