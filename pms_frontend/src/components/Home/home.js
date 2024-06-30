import React from "react";
import { HOME_PLOT, QUOTE } from "../../utility/constants";
import fetchItems from "../../utility/fetchItems";
import { useState, useEffect } from "react";
import Chart from '../UI/chart';
import './home.css'

const Home = () => {

    const [quoteData, setQuoteData] = useState({ quote: '', author: '' });
    const [analyticsData, setAnalyticsData] = useState({
        calories_per_month: [],
        calories_per_day_current_month: [],
        calories_per_day_previous_month: [],
        calories_per_meal_type_month: [],
        calories_per_meal_type_prevmonth: [],
        expense_per_month: [],
        expense_per_category: [],
        expense_per_category_current_month: [],
        consumption_per_month: [],
        consumption_per_day_current_month: [],
        consumption_per_day_last_month: []

    });

    function getMonthLabels(data) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        return data.map(item => monthNames[item[Object.keys(item)[0]] - 1]); 
    }

    useEffect(() => {
        fetchItems({url: HOME_PLOT, setItems:setAnalyticsData});
        fetchItems({url: QUOTE, setItems:setQuoteData});
    },[]);

    const hasWaterData = analyticsData.consumption_per_month.length > 0 ||
                         analyticsData.consumption_per_day_current_month.length > 0 ||
                         analyticsData.consumption_per_day_last_month.length > 0;

    const hasCalorieData = analyticsData.calories_per_month.length > 0 ||
                           analyticsData.calories_per_day_current_month.length > 0 ||
                           analyticsData.calories_per_day_previous_month.length > 0 ||
                           analyticsData.calories_per_meal_type_month.length > 0 ||
                           analyticsData.calories_per_meal_type_prevmonth.length > 0;

    const hasExpenseData = analyticsData.expense_per_month.length > 0 ||
                           analyticsData.expense_per_category.length > 0 ||
                           analyticsData.expense_per_category_current_month.length > 0;

    const hasAnyData = hasWaterData || hasCalorieData || hasExpenseData;
    const hasQuoteData = quoteData && quoteData.quote && quoteData.author;

    return(
        <div className="home-container">
            <div className="welcome-section">
                <h1 className="welcome-title">This is the Game of Personal Management.</h1>
            </div>
            {hasQuoteData && (
                        <div className="quote-section">
                            <blockquote className="quote-block">
                                <p className="quote-text">"{quoteData.quote}"</p>
                                <footer className="quote-author">— {quoteData.author}</footer>
                            </blockquote>
                        </div>
                    )}
            <div className="quick-stats">
            <h2>Your Dashboard</h2>
            {hasAnyData ? (
                <>
                    {hasWaterData && (
                        <div className="dashboard-section">
                            <h3 className="section-title">Water</h3>
                            <div className="chart-grid">
                                {analyticsData.consumption_per_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.consumption_per_month.map(item => item.consumption)}
                                        labels={getMonthLabels(analyticsData.consumption_per_month)}
                                        title="Consumption per Month"
                                        xAxisLabel="Month"
                                        yAxisLabel="Consumption"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.consumption_per_day_current_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.consumption_per_day_current_month.map(item => item.consumption)}
                                        labels={analyticsData.consumption_per_day_current_month.map(item => `Day ${item.day}`)}
                                        title="Consumption per Day (Current Month)"
                                        xAxisLabel="Day"
                                        yAxisLabel="Consumption"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.consumption_per_day_last_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.consumption_per_day_last_month.map(item => item.consumption)}
                                        labels={analyticsData.consumption_per_day_last_month.map(item => `Day ${item.day}`)}
                                        title="Consumption per Day (Last Month)"
                                        xAxisLabel="Day"
                                        yAxisLabel="Consumption"
                                        className="chart"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {hasCalorieData && (
                        <div className="dashboard-section">
                            <h3 className="section-title">Calorie</h3>
                            <div className="chart-grid">
                                {analyticsData.calories_per_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.calories_per_month.map(item => item.total)}
                                        labels={getMonthLabels(analyticsData.calories_per_month)}
                                        title="Calories per Month (Current Year)"
                                        xAxisLabel="Month"
                                        yAxisLabel="Calories"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.calories_per_day_current_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.calories_per_day_current_month.map(item => item.total)}
                                        labels={analyticsData.calories_per_day_current_month.map(item => `Day ${item.date__day}`)}
                                        title="Calories per Day (Current Month)"
                                        xAxisLabel="Day"
                                        yAxisLabel="Calories"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.calories_per_day_previous_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.calories_per_day_previous_month.map(item => item.total)}
                                        labels={analyticsData.calories_per_day_previous_month.map(item => `Day ${item.date__day}`)}
                                        title="Calories per Day (Previous Month)"
                                        xAxisLabel="Day"
                                        yAxisLabel="Calories"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.calories_per_meal_type_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.calories_per_meal_type_month.map(item => item.total)}
                                        labels={analyticsData.calories_per_meal_type_month.map(item => item.meal_type)}
                                        title="Calories per Meal Type (Current Month)"
                                        xAxisLabel="Meal Type"
                                        yAxisLabel="Calories"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.calories_per_meal_type_prevmonth.length > 0 && (
                                    <Chart
                                        data={analyticsData.calories_per_meal_type_prevmonth.map(item => item.total)}
                                        labels={analyticsData.calories_per_meal_type_prevmonth.map(item => item.meal_type)}
                                        title="Calories per Meal Type (Previous Month)"
                                        xAxisLabel="Meal Type"
                                        yAxisLabel="Calories"
                                        className="chart"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {hasExpenseData && (
                        <div className="dashboard-section">
                            <h3 className="section-title">Expense</h3>
                            <div className="chart-grid">
                                {analyticsData.expense_per_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.expense_per_month.map(item => item.total)}
                                        labels={getMonthLabels(analyticsData.expense_per_month)}
                                        title="Expense per Month (Current Year)"
                                        xAxisLabel="Month"
                                        yAxisLabel="Amount"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.expense_per_category_current_month.length > 0 && (
                                    <Chart
                                        data={analyticsData.expense_per_category_current_month.map(item => item.total)}
                                        labels={analyticsData.expense_per_category_current_month.map(item => item.category)}
                                        title="Expense per Category (Current Month)"
                                        xAxisLabel="Category"
                                        yAxisLabel="Amount"
                                        className="chart"
                                    />
                                )}
                                {analyticsData.expense_per_category.length > 0 && (
                                    <Chart
                                        data={analyticsData.expense_per_category.map(item => item.total)}
                                        labels={analyticsData.expense_per_category.map(item => item.category)}
                                        title="Expense per Category (All Time)"
                                        xAxisLabel="Category"
                                        yAxisLabel="Amount"
                                        className="chart"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p>No statistics</p>
            )}
        </div>
    </div>
    );
}

export default Home;