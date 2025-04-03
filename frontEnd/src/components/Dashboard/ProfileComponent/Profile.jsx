import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setUpdatedUser(storedUser);
        }
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    // const handleSave = async () => {
    //     try {
    //         const response = await axios.put(`https://your-api.com/users/${user._id}`, updatedUser);

    //         if (response.status === 200) {
    //             localStorage.setItem("user", JSON.stringify(response.data)); // Update localStorage
    //             setUser(response.data);
    //             message.success("Profile updated successfully!");
    //             setEditMode(false);
    //         }
    //     } catch (error) {
    //         console.error("Error updating profile:", error);
    //         message.error("Failed to update profile.");
    //     }
    // };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {user && (
                <div className="profile-content">
                    <Space direction="vertical" align="center">
                        <Avatar size={64} src={user.profileImage || undefined} icon={!user.profileImage && <UserOutlined />} />
                        {editMode ? (
                            <>
                                <Input name="name" value={updatedUser.name} onChange={handleChange} placeholder="Name" />
                                <Input name="email" value={updatedUser.email} onChange={handleChange} placeholder="Email" />
                            </>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </>
                        )}
                        {editMode ? (
                            <Button type="primary" onClick={handleSave}>Save</Button>
                        ) : (
                            <Button onClick={handleEdit}>Edit</Button>
                        )}
                    </Space>
                </div>
            )}
        </div>
    );
};

export default Profile;
