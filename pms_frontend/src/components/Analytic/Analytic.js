import React from "react";
import Calorie from "../Calorie/Calorie";
import Expense from "../Expense/Expense";
import Water from "../Water/Water";
import './Analytic.css'

const Analytic = () => {
    return(
    <div className="analytics-container">
        <h1> Analytics Dashboard</h1>
        <div className="analytics-grid">
            <div className="analytics-item">
                <Calorie />
            </div>
            <div className="analytics-item">
                <Expense />
            </div>
            <div className="analytics-item">
                <Water />
            </div>
        </div>
    </div>
    );
}

export default Analytic;