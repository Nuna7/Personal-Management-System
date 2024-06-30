import React from "react";
import getCsrfToken from "../../utility/getCsrfToken";
import { EXPENSE_OPTIONS, EXPENSE } from "../../utility/constants";
import { useState, useEffect } from "react";
import authApi from '../../api/authApi'
import handleSubmit from "../../utility/handleSubmit";
import OptionInput from "../UI/optionInput";
import './Expense.css'

const Expense = () => {
    const initialExpenseConfig = { 
        amount: 0,
        description: '',
        category: 'miscellaneous',
        date: ''
    };

    const [expenseConfig, setExpenseConfig] = useState({ ...initialExpenseConfig });
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseConfig(prevConfig => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const fetchExpenseItems = async() => {
        try{
            const res = await authApi.get(EXPENSE_OPTIONS,{
                withCredentials:true,
                'X-CSRFToken': getCsrfToken()
            })
            setOptions(res.data.expenseCategory);
        }catch(error){
            setError("Can't fetch expense items.");
        }
    };

    useEffect(() => {
        fetchExpenseItems();
    },[]);

    const handleSubmitExpense = (event) => {
        event.preventDefault();
        handleSubmit({url:EXPENSE, data:expenseConfig, setMessage:setError, message:"Can't submit Expense."}); 
        setExpenseConfig(initialExpenseConfig);
    };

    return(
        <div className="expense-container">
            <h2>Log Your Expense</h2>
            
            <form onSubmit={handleSubmitExpense} className="expense-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" 
                        id="amount" 
                        name="amount" 
                        value={expenseConfig.amount} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description" 
                        value={expenseConfig.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={expenseConfig.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <OptionInput 
                        id="category" 
                        name="category" 
                        label="Category:" 
                        options={options} 
                        value={expenseConfig.category} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Expense;