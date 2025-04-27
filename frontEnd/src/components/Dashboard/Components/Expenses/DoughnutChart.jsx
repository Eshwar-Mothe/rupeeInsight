import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ title, selectedMonth }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        values: [],
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && Array.isArray(user.expenses)) {
            const homeExpenses = user.expenses.filter((item) => {
                const itemDate = new Date(item.date);
                const itemMonthName = itemDate.toLocaleString("default", { month: "long" });
                return (
                    item.category === "Home" &&
                    itemMonthName === selectedMonth
                );
            });

            const grouped = {};
            homeExpenses.forEach((item) => {
                const sub = item.subcategory || "Others";
                grouped[sub] = (grouped[sub] || 0) + parseFloat(item.amount);
            });

            const labels = Object.keys(grouped);
            const values = Object.values(grouped);

            setChartData({ labels, values });
        }
    }, [selectedMonth]);

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                data: chartData.values,
                backgroundColor: [
                    "#1890ff",
                    "#52c41a",
                    "#f5222d",
                    "#faad14",
                    "#722ed1",
                    "#13c2c2",
                    "#eb2f96",
                ],
                hoverBackgroundColor: [
                    "#40a9ff",
                    "#73d13d",
                    "#ff4d4f",
                    "#ffc53d",
                    "#9254de",
                    "#36cfc9",
                    "#ff85c0",
                ],
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            tooltip: { enabled: true },
        },
    };

    return (
        <Card title={title} className="shadow-lg">
            <div style={{ height: "300px" }}>
                {chartData.values.length > 0 ? (
                    <Doughnut data={data} options={options} />
                ) : (
                    <p>No Home expenses found for {selectedMonth}.</p>
                )}
            </div>
        </Card>
    );
};

export default DoughnutChart;
