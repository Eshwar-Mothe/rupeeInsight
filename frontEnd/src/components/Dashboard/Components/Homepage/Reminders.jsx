import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { getRemindersData } from "../../../../serviceLayer/api";
import { format } from "date-fns"; 

const Reminders = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const [remindersData, setRemindersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRemindersData = async () => {
            try {
                console.log("reminders", loggedInUser.reminders);
                
                const formattedData = loggedInUser.reminders.map((item, index) => ({
                    ...item,
                    key: item._id || index.toString(),
                    sNo: index + 1,
                    reminderDueDate: item.reminderDueDate
                        ? format(new Date(item.reminderDueDate), "dd MMM yyyy") // Formatting Date
                        : "N/A",
                }));

                setRemindersData(formattedData);
            } catch (error) {
                console.error("Error fetching reminders data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (loggedInUser?.email) {
            fetchRemindersData();
        }
    }, [loggedInUser.email]);

    const columns = [
        {
            title: "S.No",
            dataIndex: "sNo",
            key: "sNo",
        },
        {
            title: "Category",
            dataIndex: "reminderCategory",
            key: "reminderCategory",
            className: "text-center",
        },
        {
            title: "Title",
            dataIndex: "reminderTitle",
            key: "reminderTitle",
            className: "text-center",
        },
        {
            title: "Duration",
            dataIndex: "reminderDuration",
            key: "reminderDuration",
            className: "text-center",
            render: (text) => (
                <span className={text === "Yearly" ? "yearly" : text === "Monthly" ? "monthly" : ""}>
                    {text}
                </span>
            ),
        },
        {
            title: "Due Date",
            dataIndex: "reminderDueDate",
            key: "reminderDueDate",
            className: "text-center",
        },
        {
            title: "Amount (₹)",
            dataIndex: "amount",
            key: "amount",
            className: "text-center",
        },
        {
            title: "Actions",
            key: "actions",
            className: "text-center",
            render: (_, record) => (
                <Space size="middle">
                    <Button className="antd-button">Payment Done</Button>
                    <Button className="antd-button">Snooze</Button>
                    <Button className="antd-button">Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="reminders py-3">
            <header className="d-flex justify-content-between align-items-center gap-5 my-2 px-3 filter">
                <h2>Reminders</h2>
                <Link to="/expenses">
                    <Button>View All</Button>
                </Link>
            </header>

            {loading ? (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={remindersData}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                />
            )}
        </div>
    );
};

export default Reminders;
