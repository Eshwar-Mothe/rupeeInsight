import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';
import { postLoginData } from '../../../serviceLayer/api';

const Login = () => {
  const onFinish = async (values) => {
    const payload = {
        email: values.email,
        password: values.password
    };

    try {
        const response = await postLoginData(payload);

        const isTokenExist = response.token ? true : false;
        if (response.status === 200) {
            console.log("Login Successful:", response.data);
            localStorage.setItem("token", isTokenExist); 
            localStorage.setItem("user", JSON.stringify(response.data));
            message.success("Login successful!"); 
        } else {
            message.error(response.data.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        message.error("An error occurred. Please check your credentials.");
    }
};


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: '300px', margin: '0 auto', padding: '50px 0' }}>
        <h3 style={{ textAlign: 'center' }}>Sign In</h3>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email or Mobile!' }]}
          >
            <Input placeholder="Email/Mobile" className={`label ${theme === "light" ? "label-light" : "label-dark"}`} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" className={`label ${theme === "light" ? "label-light" : "label-dark"}`} />
          </Form.Item>

          <Form.Item>
            <Button className='submit' htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <div>
            <Link to="/forgot-password" className='link'>Forgot Password</Link>
            <span style={{ margin: '0 8px' }}>|</span>
            <span>New User?<Link to="/signup" className='link'> Sign up</Link></span>
            <br />
            <span>Try Features?<Link to="/home" className='link'> Guest Mode</Link></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;