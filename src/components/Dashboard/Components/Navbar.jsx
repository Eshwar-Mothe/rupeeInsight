import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = ({ onNavClick }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex sticky-top">
                <Link className="navbar-brand" onClick={onNavClick} to="/home">RupeeInsight</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" onClick={onNavClick} to="/home">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={onNavClick} to="/expenses">Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={onNavClick} to="/debts">Debts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={onNavClick} to="/investments">Investements</Link>
                        </li>
                    </ul>
                </div>
                <div className="avatar">
                    <Space className='custom-avatar'>
                        <Avatar size={32} icon={<UserOutlined />} />
                    </Space>

                <div className="options">
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Link to="/logout" className="nav-link">Logout</Link>
                </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar