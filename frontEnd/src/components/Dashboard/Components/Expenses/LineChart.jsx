import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ title, selectedMonth }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.expenses)) {
      const healthExpenses = user.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        const itemMonthName = itemDate.toLocaleString("default", { month: "long" });
        return item.category === "Health" && itemMonthName === selectedMonth;
      });

      const grouped = {};
      healthExpenses.forEach((item) => {
        const sub = item.subcategory || "Others";
        grouped[sub] = (grouped[sub] || 0) + parseFloat(item.amount);
      });

      setLabels(Object.keys(grouped));
      setValues(Object.values(grouped));
    }
  }, [selectedMonth]);

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "red",
        pointBackgroundColor: "red",
        borderWidth: 3,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "#595959", font: { size: 10 } },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#595959", font: { size: 10 } },
      },
    },
  };

  return (
    <Card title={title} className="shadow-lg">
      <div style={{ height: "300px" }}>
        {values.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <p>No Health expenses found for {selectedMonth}.</p>
        )}
      </div>
    </Card>
  );
};

export default LineChart;
