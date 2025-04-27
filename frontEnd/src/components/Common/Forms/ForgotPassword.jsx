import React, { useState } from 'react';
import NavBar from '../NavBar';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { postResetPassword } from '../../../serviceLayer/api';
import { useResetContext } from './ResetContext';

const ForgotPassword = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { setResetAllowed } = useResetContext();

  const onFinish = async (value) => {
    const baseUrl = `http://localhost:5173/reset`;

    try {
      const payload = {
        to: value.email,
        subject: 'Reset Password',
        text: `Click on the link to reset your password: ${baseUrl}`
      };

      console.log("Sending payload:", payload);
      const response = await postResetPassword(payload);

      if (response.status === 200) {
        messageApi.success("Reset link sent to your email");
        setIsDisabled(true);
        messageApi.success("Setting reset allow");
        setResetAllowed(true);
      } else {
        messageApi.error(response.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error("Error at forgot password:", err);
      messageApi.error("Something went wrong. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation Failed:', errorInfo);
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  return (
    <>
      {contextHolder}
      <NavBar />
      <div style={{ maxWidth: '300px', margin: '0 auto', padding: '50px 0' }}>
        <h3 style={{ textAlign: 'center' }}>Forgot Password</h3>
        <Form
          name="forgot-password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input
              placeholder="Email/Mobile"
              className={`label ${theme === "light" ? "label-light" : "label-dark"}`}
            />
          </Form.Item>

          <Form.Item>
            <Button className='submit' htmlType="submit" block disabled={isDisabled}>
              {isDisabled ? 'Link Sent' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '10px' }} className='d-flex gap-5'>
          <span>New User? <Link to="/signup" className='link'>Sign up</Link></span>
          <span>Sign in? <Link to="/signin" className='link'>Sign In</Link></span>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
