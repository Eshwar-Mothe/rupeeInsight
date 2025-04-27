import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ title, selectedMonth }) => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.expenses)) {
      const travelExpenses = user.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        const itemMonth = itemDate.toLocaleString("default", { month: "long" });
        return item.category === "Travel" && itemMonth === selectedMonth;
      });

      const grouped = {};
      travelExpenses.forEach((item) => {
        const sub = item.subcategory || "Others";
        grouped[sub] = (grouped[sub] || 0) + parseFloat(item.amount);
      });

      setLabels(Object.keys(grouped));
      setDataValues(Object.values(grouped));
    }
  }, [selectedMonth]);

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        backgroundColor: [
          "#1890ff",
          "#52c41a",
          "#f5222d",
          "#faad14",
          "#722ed1",
          "#13c2c2",
          "#eb2f96",
          "#2f54eb",
          "#a0d911",
          "#fa541c",
        ],
        borderRadius: 8,
        borderWidth: 1,
        barThickness: "flex",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: {
          color: "#595959",
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#595959",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <Card title={title} className="shadow-lg rounded-xl">
      <div style={{ height: "300px" }}>
        {dataValues.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>No Travel expenses for {selectedMonth}.</p>
        )}
      </div>
    </Card>
  );
};

export default BarChart;
