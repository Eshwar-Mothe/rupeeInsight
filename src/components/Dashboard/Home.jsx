import React, { useState } from 'react';
import { Layout } from 'antd';
import '../Dashboard/dashboardStyles.css';
import Navbar from './Components/Navbar';
import LoadingBorder from './Loadingbar';
import InfoContainer from './Components/InfoContainer';
import { DatePicker, Space } from 'antd';
import Expenses from './Components/ExpensesContainer';
import ChartContainer from './Components/ChartContainer';
import Reminders from './Components/Reminders';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRouteChange = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      {isLoading && <LoadingBorder />}
      <Layout>
        <Navbar onNavClick={handleRouteChange} />
        <Layout>
          <div className="currentUser d-flex justify-content-between px-3 align-items-center">
            <div className="userDetails d-flex align-items-center">
              <img
                alt="User Avatar"
                src="logo.png"
                style={{ width: '64px', height: '64px', borderRadius: '50%' }}
              />
              <div>
                <h2>Welcome <span id='loggedInUser'>User</span></h2>
              </div>
            </div>

            <div className="date-downloadStatement d-flex justify-content-between align-items-center gap-2">
              <div className='input-date '>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    id="rangePicker"
                    onFocus={(_, info) => {
                      console.log('Focus:', info.range);
                    }}
                    onBlur={(_, info) => {
                      console.log('Blur:', info.range);
                    }}
                    className='date-picker'
                  />
                </Space>
              </div>
              <div className='download-statement'>
                <button className="btn btn-primary">Download</button>
              </div>
            </div>
          </div>
        </Layout>
        <Layout>
          <Content className='my-3 bg-light p-5'>
            <InfoContainer />
          </Content>
        </Layout>

        <Layout>
          <Content className='d-flex justify-content-between gap-5 p-5 bg-light'>
            <ChartContainer />
            <Expenses />
          </Content>
        </Layout>
        <Layout>
          <Content className='my-3 bg-light p-5'>
            <Reminders />
          </Content>
        </Layout>
        
      </Layout>
    </>
  );
};

export default Home;