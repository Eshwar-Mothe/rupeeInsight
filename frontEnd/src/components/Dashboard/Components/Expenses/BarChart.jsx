import React from "react";
import { Card } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ title, labels }) => {
    const dataValues = [500, 300, 400, 250, 200];
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor: ["#1890ff", "#52c41a", "#f5222d", "#faad14", "#722ed1"],
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
                ticks: { color: "#595959", font: { size: 12 } },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#595959", font: { size: 12 } },
            },
        },
    };

    return (
        <Card title={title} className="shadow-lg">
            <div style={{ height: "300px" }}>
                <Bar data={data} options={options} />
            </div>
        </Card>
    );
};

export default BarChart;
