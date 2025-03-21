import React from "react";
import { Card } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({title, labels}) => {
    const dataValues = [500, 300, 400, 250, 200]
    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: ["#1890ff", "#52c41a", "#f5222d", "#faad14", "#722ed1"],
                hoverBackgroundColor: ["#40a9ff", "#73d13d", "#ff4d4f", "#ffc53d", "#9254de"],
                borderWidth: 2,
                hoverOffset: 15
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
                <Doughnut data={data} options={options} />
        </Card>
    );
};

export default DoughnutChart;
