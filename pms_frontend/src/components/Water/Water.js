import React, { useState } from "react";
import { WATER } from "../../utility/constants";
import handleSubmit from "../../utility/handleSubmit";
import './Water.css'

const Water = () => {
    const initialWaterConfig = { 
        amount: 0,
        date: ''
    };

    const [waterConfig, setWaterConfig] = useState({ ...initialWaterConfig });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWaterConfig(prevConfig => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const handleSubmitWater = (event) => {
        event.preventDefault();
        handleSubmit({
            url: WATER,
            data: waterConfig,
            setMessage: setError,
            message: "Can't submit Water intake."
        });
        setWaterConfig(initialWaterConfig);
    };

    return (
        <div className="water-container">
            <h2>Log Your Water Intake</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmitWater} className="water-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount (in ml):</label>
                    <input 
                        type="number" 
                        id="amount" 
                        name="amount" 
                        value={waterConfig.amount} 
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
                        value={waterConfig.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default Water;
