import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetContext } from './ResetContext';
import { Form, Input, Button, message } from 'antd';

const ResetPassword = () => {
  const { resetAllowed } = useResetContext();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  console.log("allow state at resetPassword",resetAllowed)

  useEffect(() => {
    if (!resetAllowed) {
      messageApi.warning("Unauthorized access. Please request a reset link first.");
      navigate('/forgotpassword');
    }
  }, [resetAllowed, navigate, messageApi]);

  const onFinish = (values) => {
    // API logic to update the password can go here
    console.log("New Password", values.password);
    messageApi.success("Password updated successfully!");
    sessionStorage.removeItem('resetAllowed');
    navigate('/signin');
  };

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: '300px', margin: '0 auto', padding: '50px 0' }}>
        <h3 style={{ textAlign: 'center' }}>Reset Your Password</h3>
        <Form
          name="resetPassword"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirmpassword"
            rules={[{ required: true, message: 'Re-Enter password' }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item className='filter'>
            <Button htmlType="submit" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
