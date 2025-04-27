import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = ({ selectedMonth }) => {
  const title = "Entertainment Expenses";
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.expenses)) {
      const entertainmentExpenses = user.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        const itemMonth = itemDate.toLocaleString("default", { month: "long" });
        return item.category === "Entertainment" && itemMonth === selectedMonth;
      });

      const grouped = {};
      entertainmentExpenses.forEach((item) => {
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
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <Card title={title} className="shadow-lg rounded-xl">
      <div style={{ height: "300px" }}>
        {dataValues.length > 0 ? (
          <PolarArea data={data} options={options} />
        ) : (
          <p>No Entertainment expenses for {selectedMonth}.</p>
        )}
      </div>
    </Card>
  );
};

export default PolarChart;
