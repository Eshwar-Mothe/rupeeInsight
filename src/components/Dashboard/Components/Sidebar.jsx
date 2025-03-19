import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ navbarHeight = 60, onNavClick }) => {
    const [siderHeight, setSiderHeight] = useState('100vh');

    useEffect(() => {
        const updateSiderHeight = () => {
            const windowHeight = window.innerHeight;
            setSiderHeight(`${windowHeight - navbarHeight}px`);
        };

        updateSiderHeight();
        window.addEventListener('resize', updateSiderHeight);

        return () => window.removeEventListener('resize', updateSiderHeight);
    }, [navbarHeight]);

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: siderHeight,
                position: 'fixed',
                left: 0,
                top: navbarHeight,
            }}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to={"/home"} className="nav-link" onClick={onNavClick}>nav 1</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to={"/home"}>nav 2</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <Link to={"/home"}>nav 3</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar