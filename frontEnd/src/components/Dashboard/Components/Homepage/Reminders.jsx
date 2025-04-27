import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, message, Modal } from "antd";
import { Link } from "react-router-dom";
import { format, isValid, isBefore } from "date-fns";

// Replace these with actual import paths or define in the same file
import {
  updatePaymentStatusData,
  updateSnoozeStatusData,
  updateReminderData,
  deleteReminder,
} from "../../../../serviceLayer/api";

const Reminders = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [remindersData, setRemindersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchRemindersData = async () => {
      try {
        const rawReminders = loggedInUser.reminders || [];

        const formattedData = rawReminders
          .filter((item) => !item.isDeleted) // Exclude deleted reminders
          .sort((a, b) => new Date(b.reminderDueDate) - new Date(a.reminderDueDate)) // Descending order
          .map((item, index) => {
            const dateObj = new Date(item.reminderDueDate);

            return {
              ...item,
              key: item._id || index.toString(),
              sNo: index + 1,
              reminderDueDate: isValid(dateObj)
                ? format(dateObj, "dd MMM yyyy")
                : "N/A",
              isOverdue: isValid(dateObj) && isBefore(dateObj, new Date()),
            };
          });

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
  }, [loggedInUser?.email]);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
     setLoading(false)
    }, 1000);
  };

  const handlePayment = async (record) => {
    try {
      await updatePaymentStatusData(JSON.stringify({ id: record._id }));
      messageApi.success("Marked as payment done", 2);
      refreshData();
    } catch (error) {
      console.error("Payment error:", error);
      messageApi.error("Payment update failed");
    }
  };

  const handleSnooze = async (record) => {
    try {
      await updateSnoozeStatusData(JSON.stringify({ id: record._id }));
      messageApi.warning("Snoozed for 4 weeks", 2);
      refreshData();
    } catch (error) {
      console.error("Snooze error:", error);
      messageApi.error("Snooze update failed");
    }
  };

  const handleEdit = async (record) => {
    try {
      // Assume inline update or redirect to edit page, mock call for now
      await updateReminderData(JSON.stringify({ id: record._id }));
      messageApi.loading("Editing reminder...", 2);
      refreshData();
    } catch (error) {
      console.error("Edit error:", error);
      messageApi.error("Edit failed");
    }
  };

  const handleDelete = async () => {
    console.log('am triggered')
    Modal.confirm({
      title: "Are you sure you want to delete this reminder?",
      onOk: async () => {
        try {
          messageApi.success("Deleted reminder", 2);
        } catch (error) {
          console.error("Delete error:", error);
          messageApi.error("Delete failed");
        }
      },
    });
  };

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
        <span
          className={
            text === "Yearly" ? "text-success" :
            text === "Monthly" ? "text-warning" :
            ""
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "reminderDueDate",
      key: "reminderDueDate",
      className: "text-center",
      render: (_, record) => (
        <span style={{ color: record.isOverdue ? "red" : "inherit" }}>
          {record.reminderDueDate}
        </span>
      ),
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
          <Button className="antd-button" onClick={() => handlePayment(record)}>
            Payment Done
          </Button>
          <Button className="antd-button" onClick={() => handleSnooze(record)}>
            Snooze
          </Button>
          <Button className="antd-button" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete()}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="reminders py-3">
      {contextHolder}
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
