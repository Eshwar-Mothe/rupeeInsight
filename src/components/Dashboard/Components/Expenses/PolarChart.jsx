import React from "react";
import { Card } from "antd";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
    const title = "Entertainment Expenses";
    const labels = ["Movies", "Concerts", "Streaming Services", "Gaming", "Events"];
    const dataValues = [600, 450, 500, 400, 350];
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor: ["#1890ff", "#52c41a", "#f5222d", "#faad14", "#722ed1"],
                borderWidth: 2,
                hoverOffset: 15
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
        <Card title={title} className="shadow-lg">
            <div style={{ height: "300px" }}>
                <PolarArea data={data} options={options} />
            </div>
        </Card>
    );
};

export default PolarChart;
