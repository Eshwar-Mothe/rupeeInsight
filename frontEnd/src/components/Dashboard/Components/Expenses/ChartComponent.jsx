import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ selectedSegment1, selectedSegment2, user }) => {
    if (!user) return <p>Loading...</p>;

    const currentYear = new Date().getFullYear();
    const futureYears = Array.from({ length: 5 }, (_, i) => currentYear + i);
    const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const groupByPeriod = (transactions, period) => {
        return transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            let key;
            if (period === "Yearly") key = date.getFullYear();
            else if (period === "Monthly") key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            else key = `Week ${Math.ceil(date.getDate() / 7)}`;
            acc[key] = (acc[key] || 0) + transaction.amount;
            return acc;
        }, {});
    };

    const expenseData = groupByPeriod(user.expenses || [], selectedSegment2);
    const savingsData = groupByPeriod(user.investments || [], selectedSegment2);
    const debtsData = groupByPeriod(user.debts || [], selectedSegment2);

    const datasetMap = {
        Expense: expenseData,
        Savings: savingsData,
        Debts: debtsData,
    };

    const labels =
        selectedSegment2 === "Yearly"
            ? Object.keys(datasetMap[selectedSegment1])
            : selectedSegment2 === "Weekly"
            ? weekLabels
            : Object.keys(datasetMap[selectedSegment1]);

    const chartData = {
        labels,
        datasets: [
            {
                label: `${selectedSegment1} - ${selectedSegment2}`,
                data: Object.values(datasetMap[selectedSegment1]),
                borderColor: "#1890ff",
                backgroundColor: "rgba(24, 144, 255, 0.2)",
                tension: 0,
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
        },
    };

    return (
        <Card title="Finance Analysis" style={{ width: "100%", margin: "auto"}} className="chart-container">
            <div className="chart-wrapper">
                <Line data={chartData} options={chartOptions} />
            </div>
        </Card>
    );
};

export default ChartComponent;
