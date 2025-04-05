import React, { useState } from "react";
import { Segmented } from "antd";
import ChartComponent from "../Expenses/ChartComponent";

const segment1Options = ["Expense", "Savings", "Debts"];
const segment2Options = ["Yearly", "Monthly", "Weekly"];

const ChartContainer = () => {
    // State to track selected filters
    const [selectedSegment1, setSelectedSegment1] = useState("Expense");
    const [selectedSegment2, setSelectedSegment2] = useState("Yearly");
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    const userId = loggedInUser._id
    const registeredYear = loggedInUser.createdAt.split("-")[0]

    return (
        <div className="chartContainer">
            <header className="d-flex justify-content-between gap-5 align-items-center">
                <div className="section1">
                    <h6>Overview</h6>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <h6>SortBy: </h6>
                    <Segmented className="segment" options={segment1Options} value={selectedSegment1} onChange={setSelectedSegment1} />
                    <Segmented className="segment" options={segment2Options} value={selectedSegment2} onChange={setSelectedSegment2} />
                </div>
            </header>

            <div style={{ paddingInline: 10, paddingBlock: 10 }}>
                <ChartComponent selectedSegment1={selectedSegment1} selectedSegment2={selectedSegment2} registrationYear = {registeredYear} user = {loggedInUser}/>
            </div>
        </div>
    );
};

export default ChartContainer;
