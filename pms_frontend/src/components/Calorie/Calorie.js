import React, { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import { CALORIE, CALORIE_OPTIONS } from "../../utility/constants";
import getCsrfToken from "../../utility/getCsrfToken";
import handleSubmit from "../../utility/handleSubmit";
import OptionInput from "../UI/optionInput";
import TextInput from "../UI/textInput";
import './Calorie.css';

const Calorie = () => {
    const initialCalorieConfig = { 
        food_item: '',
        calories: 0,
        date: '',
        meal_type: 'breakfast'
    };

    const [calorieConfig, setCalorieConfig] = useState({ ...initialCalorieConfig });
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCalorieConfig(prevConfig => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const fetchCalorieItems = async() => {
        try{
            const res = await authApi.get(CALORIE_OPTIONS,{
                withCredentials:true,
                'X-CSRFToken': getCsrfToken()
            })
            setOptions(res.data.mealType);
        }catch(error){
            setError("Can't fetch calorie items.");
        }
    };

    useEffect(() => {
        fetchCalorieItems();
    },[]);

    const handleSubmitCalorie = (event) => {
        event.preventDefault();
        handleSubmit({url:CALORIE, data:calorieConfig, setMessage:setError, message:"Can't submit Calorie."}); 
        setCalorieConfig(initialCalorieConfig);
    };

    return(

        <div className="calorie-container">
            <h2>Log Your Calories</h2>
            
            <form onSubmit={handleSubmitCalorie} className="calorie-form">
                <div className="form-group">
                    <TextInput id="food_item" name="food_item" label="Keywords:" 
                        placeholder="Enter Food item" value={calorieConfig.food_item} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="calories">Calories:</label>
                    <input 
                        type="number" 
                        id="calories" 
                        name="calories" 
                        value={calorieConfig.calories} 
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
                        value={calorieConfig.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <OptionInput className="inputText" id="meal_type" name="meal_type" label="Meal Type:" options={options}
                        value={calorieConfig.meal_type} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );

}

export default Calorie;