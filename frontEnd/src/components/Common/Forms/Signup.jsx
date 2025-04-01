import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Select, Modal, message, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { postEmailVerificationData, postRegisterData } from '../../../serviceLayer/api';

const { Option } = Select;

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    income: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    jobTitle: "",
    debt: "",
    savings: "",
    profileImage: null,
  });
  const [form] = Form.useForm()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setUserDetails({ ...userDetails, dob: dateString });
  };

  const handleSelectChange = (value, name) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (info) => {
    console.log('first')
    if (info.file.originFileObj) {
      setUserDetails(prevState => ({
        ...prevState,
        profileImage: info.file.originFileObj
      }));
      console.log("Selected File:", info.file.originFileObj);
    }
  };

  const handleSignupSubmit = async () => {
    try {
      console.log(userDetails)

      const newOtp = Math.floor(Math.random() * 900000)
      setGeneratedOtp(newOtp);
      const payload = {
        email: userDetails.email,
        subject: "OTP Verification",
        text: `Your OTP for RupeeInsight is ${newOtp}`
      }

      const loadingMessage = messageApi.loading('Sending email verification...', 0);

      const response = await postEmailVerificationData(payload);

      loadingMessage();

      if (response.status === 200) {
        messageApi.success("OTP sent to your email");
        setIsModalVisible(true);
      } else {
        messageApi.error(response.message);
      }
    } catch (error) {
      messageApi.error("Failed to send OTP");
    }
  };


  const handleOtpSubmission = async () => {
    try {
      console.log('otp box triggered', userDetails)
      console.log(generatedOtp, otp)


      if (parseInt(otp) === generatedOtp) {
        console.log("sending Data")
        const registerResponse = await postRegisterData(userDetails);

        console.log(registerResponse)

        if (registerResponse.status === 200) {
          messageApi.success("User registered successfully!");
          setIsModalVisible(false);
          setOtp("");
          setGeneratedOtp("")
          form.resetFields();
          setUserDetails({ email: "", password: "", username: "", income: "", mobile: "", gender: "", dob: "", address: "", city: "", state: "", pincode: "", jobTitle: "", debt: "", savings: "" });
        } else {
          messageApi.error(registerResponse.message);
        }
      } else {
        messageApi.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      messageApi.error("Error verifying OTP.");
    }
  };
  return (
    <>
      {contextHolder}
      <NavBar />
      <div className='d-flex align-items-center justify-content-center signupContainer'>
        <div className="left-section text-center" >
          <img src="/logo.png" alt="RupeeInsight Logo" />
          <h1>RupeeInsight</h1>
        </div>

        <div className="signup-container container d-flex align-items-center justify-content-center">
          <div className="right-section">
            <h1 className='text-center'>Sign Up</h1>
            <Form form={form} layout="vertical" onFinish={handleSignupSubmit} autoComplete="off">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Name" name="username" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input name="username" value={userDetails.username} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input name="email" value={userDetails.email} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Mobile" name="mobile" rules={[{ required: true, message: 'Please enter your mobile number' }]}>
                    <Input name="mobile" value={userDetails.mobile} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
                    <Select onChange={(value) => handleSelectChange(value, 'gender')}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Profile Picture" name="profileImage">
                <Upload
                  beforeUpload={() => false} // Prevents automatic upload
                  onChange={handleFileChange} // Calls function to update state
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
                <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input.TextArea name="address" value={userDetails.address} onChange={handleInputChange} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
                    <Input name="city" value={userDetails.city} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter your state' }]}>
                    <Input name="state" value={userDetails.state} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter your pincode' }]}>
                    <Input name="pincode" value={userDetails.pincode} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password name="password" value={userDetails.password} onChange={handleInputChange} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true, message: 'Please enter your Job Title' }]}>
                    <Input name="jobTitle" value={userDetails.jobTitle} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Income" name="income" rules={[{ required: true, message: 'Please enter your income' }]}>
                    <Input type="number" name="income" value={userDetails.income} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Debt" name="debt">
                    <Input type="number" name="debt" value={userDetails.debt} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Savings" name="savings">
                    <Input type="number" name="savings" value={userDetails.savings} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item className='text-center'>
                <Button className='submit w-50' htmlType="submit">Signup</Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span>Existing User? <Link to="/signin" className='link'>Sign In</Link></span>
            </div>
          </div>
        </div>
      </div>

      <Modal title="Enter OTP" open={isModalVisible} onOk={handleOtpSubmission} onCancel={() => setIsModalVisible(false)}>
        <p>Enter the OTP sent to your Email:"{userDetails.email}"</p>
        <Input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
      </Modal>
    </>
  );
};

export default Signup;
