import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DebtsChart = () => {
    const title = "Loan Repayment Trends";
    const labels = ["Bank Loan", "Gold Loan", "Car Loan", "Home Loan", "Personal Loan"];
    
    const actualLoanAmounts = [500000, 200000, 300000, 1000000, 150000];
    const remainingBalances = [300000, 120000, 180000, 700000, 90000];
    const recommendedPayments = [25000, 10000, 15000, 40000, 12000];
    const increasePercentages = [5, 3, 6, 4, 7];
    const loanRepayments = [20000, 8000, 12000, 35000, 10000];
    const loanTenure = [60, 36, 48, 120, 24];
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Actual Loan Amount",
                data: actualLoanAmounts,
                backgroundColor: "rgba(24, 144, 255, 0.4)",
                borderColor: "#1890ff",
                pointBackgroundColor: "#1890ff",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
            {
                label: "Remaining Balance",
                data: remainingBalances,
                backgroundColor: "rgba(245, 34, 45, 0.4)",
                borderColor: "#f5222d",
                pointBackgroundColor: "#f5222d",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
            {
                label: "Recommended Payment",
                data: recommendedPayments,
                backgroundColor: "rgba(82, 196, 26, 0.4)",
                borderColor: "#52c41a",
                pointBackgroundColor: "#52c41a",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                yAxisID: "y-recommended"
            },
            {
                label: "Loan Increase %",
                data: increasePercentages,
                backgroundColor: "rgba(250, 173, 20, 0.4)",
                borderColor: "#faad14",
                pointBackgroundColor: "#faad14",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                yAxisID: "y-percentage"
            },
            {
                label: "Loan Repayments",
                data: loanRepayments,
                backgroundColor: "rgba(0, 201, 167, 0.4)",
                borderColor: "#00c9a7",
                pointBackgroundColor: "#00c9a7",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                yAxisID: "y-repayments"
            },
            {
                label: "Loan Tenure (months)",
                data: loanTenure,
                backgroundColor: "rgba(128, 0, 128, 0.4)",
                borderColor: "#800080",
                pointBackgroundColor: "#800080",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                yAxisID: "y-tenure"
            }
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
                ticks: { color: "#595959", font: { size: 12 } },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#595959", font: { size: 12 } },
            },
            "y-percentage": {
                position: "right",
                ticks: { color: "#faad14", font: { size: 12 }, callback: value => value + "%" },
                grid: { drawOnChartArea: false }
            },
            "y-recommended": {
                position: "left",
                ticks: { color: "#52c41a", font: { size: 12 } },
                grid: { drawOnChartArea: false }
            },
            "y-repayments": {
                position: "right",
                ticks: { color: "#00c9a7", font: { size: 12 } },
                grid: { drawOnChartArea: false }
            },
            "y-tenure": {
                position: "left",
                ticks: { color: "#800080", font: { size: 12 } },
                grid: { drawOnChartArea: false }
            }
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

export default DebtsChart;
