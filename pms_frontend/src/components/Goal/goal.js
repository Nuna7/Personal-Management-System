import React, { useState,useEffect } from 'react';
import { GOAL, GOAL_PLOT } from '../../utility/constants';
import ItemBlock from '../UI/ItemBlock';
import handleDelete from '../../utility/handleDelete';
import handleEdit from '../../utility/handleEdit';
import handleUnedit from '../../utility/handleUnedit';
import fetchItems from '../../utility/fetchItems';
import './goal.css'
import handleSubmit from '../../utility/handleSubmit';

const Goal = () => {
    const initialGoalConfig = { 
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        priority: 'low',
        status: 'pending',
    };

    const [goalConfig, setGoalConfig] = useState({ ...initialGoalConfig });
    const [goalItems, setGoalItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGoalConfig(prevConfig => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const fetchGoalItems = () => {
        fetchItems({url:GOAL_PLOT, setItems:setGoalItems, setErrorMessage:setErrorMessage});
    };

    useEffect( () => {
        fetchGoalItems();
    },[]);

    const handleSubmitGoal = async(event) => {
        event.preventDefault();
        await handleSubmit({url:GOAL, data:goalConfig, setMessage:setErrorMessage, message:"Can't submit Goal"}); 
        fetchGoalItems();  
        setGoalConfig(initialGoalConfig);
    };

    const handleEditGoal = (goalId) => {
        handleEdit({items:goalItems, setItems:setGoalItems ,setConfig:setGoalConfig, id:goalId});
    };

    const handleDeleteGoal = (goalId) => {
        handleDelete({url:GOAL, id:goalId, fetchItems:fetchGoalItems, setError:setErrorMessage});
    };

    const handleUneditGoal = () => {
        handleUnedit({items:goalItems, setItems:setGoalItems, setConfig:setGoalConfig, 
                    initialConfig:initialGoalConfig, setError:setErrorMessage});
    };

    const renderGoalItem = (item) => (
        <>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Start date:</strong> {item.start_date}</p> 
            <p><strong>End date:</strong> {item.end_date}</p> 
            <p><strong>Priority:</strong> {item.priority}</p> 
            <p><strong>Status:</strong> {item.status}</p> 
            <div className="goal-form">
                {item.isEdited ? (
                    <button onClick={() => handleUneditGoal()}>Unedit</button>
                ) : (
                    <>
                        <button onClick={() => handleEditGoal(item.id)} className="goal-form-button">Edit</button>
                        <button onClick={() => handleDeleteGoal(item.id)} className="goal-form-button">Delete</button>
                    </>
                )}
            </div>
        </>
    );

    const hasTaskItems = goalItems.length > 0;

    return (
        <div className='goal-container'>
            <div className='form-section'>
                <form onSubmit={handleSubmitGoal}>
                    <h2>Goal</h2>
                    <label>
                        Title:
                        <input 
                            type="text" 
                            name="title" 
                            maxLength="50"
                            value={goalConfig.title} 
                            onChange={handleChange}
                            required 
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea 
                            name="description" 
                            value={goalConfig.description} 
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    <br />
                    <div className="date-range">
                        <div className="date-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input 
                                type="date" 
                                id="startDate" 
                                name="start_date" 
                                value={goalConfig.start_date} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="date-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input 
                                type="date" 
                                id="endDate" 
                                name="end_date" 
                                value={goalConfig.end_date} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <label>
                        Priority:
                        <select 
                            name="priority" 
                            value={goalConfig.priority} 
                            onChange={handleChange}
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Status:
                        <select 
                            name="status" 
                            value={goalConfig.status} 
                            onChange={handleChange}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {hasTaskItems && (
                <div className='display-section'>
                    <ItemBlock
                        title="All Goals"
                        items={goalItems}
                        renderItem={renderGoalItem}
                    />
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>  
    );
};

export default Goal;