import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onNavClick }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState()

    const loggedInUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (loggedInUser) {
            setProfileImage(loggedInUser.profileImage)
        } else {
            setProfileImage(null)
        }
    }, [loggedInUser?._id])


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex sticky-top justify-content-between">
            <div id="leftSection">
                <div className="logo">
                    <Link
                        className={`navbar-brand ${location.pathname === "/home" ? "active" : ""}`}
                        onClick={onNavClick}
                        to="/home"
                    >
                        RupeeInsight
                    </Link>
                </div>
                <div className="button">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={handleToggle}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>

            <div className="rightSection">

                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <div className="navLinks">

                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
                                onClick={onNavClick}
                                to="/home"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/expenses" ? "active" : ""}`}
                                onClick={onNavClick}
                                to="/expenses"
                            >
                                Expenses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/debts" ? "active" : ""}`}
                                onClick={onNavClick}
                                to="/debts"
                            >
                                Debts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/investments" ? "active" : ""}`}
                                onClick={onNavClick}
                                to="/investments"
                            >
                                Investments
                            </Link>
                        </li>
                    </ul>
                    <div className="avatar">
                        <Space className='custom-avatar'>
                            <Avatar
                                size={32}
                                src={profileImage ? profileImage : undefined}
                                icon={!profileImage && <UserOutlined />}
                            />
                        </Space>

                        <div className="options">
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
