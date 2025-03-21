import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = () => {
    const title = "Health Expenses";
    const labels = ["Doctor Visits", "Medicines", "Insurance", "Gym", "Therapy"];
    const dataValues = [500, 1400, 450, 300, 350];
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor: "gray",
                borderColor: "red",
                pointBackgroundColor: "red",
                borderWidth: 3,
                fill: true,
                tension: 0,
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
                <Line data={data} options={options} />
            </div>
        </Card>
    );
};

export default LineChart;
