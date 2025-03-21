import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ selectedSegment1, selectedSegment2 }) => {
    // Sample dataset for different conditions
    const datasetMap = {
        Expense: {
            Yearly: [12000, 15000, 17000, 20000, 18000, 21000, 25000, 23000, 27000, 30000, 32000, 35000],
            Monthly: [1200, 1800, 1000, 2000, 1500, 2200, 1700, 2500, 2100, 2300, 2600, 2800],
            Weekly: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
        },
        Savings: {
            Yearly: [5000, 6000, 8000, 7500, 9000, 11000, 10000, 11500, 12000, 13000, 14000, 15000],
            Monthly: [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
            Weekly: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        },
        Debts: {
            Yearly: [7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000],
            Monthly: [500, 700, 600, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600],
            Weekly: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
        },
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `${selectedSegment1} - ${selectedSegment2}`,
                data: datasetMap[selectedSegment1][selectedSegment2],
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
        <Card title="Finance Analysis" style={{ width: "100%", margin: "auto", padding: "20px" }}>
            <Line data={chartData} options={chartOptions} style={{ color:'red' }}/>
        </Card>
    );
};

export default ChartComponent;
