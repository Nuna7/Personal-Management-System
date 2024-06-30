import React, { useState,useEffect } from 'react';
import { TASK, TASK_PLOT } from '../../utility/constants';
import ItemBlock from '../UI/ItemBlock';
import handleDelete from '../../utility/handleDelete';
import handleEdit from '../../utility/handleEdit';
import handleSubmit from '../../utility/handleSubmit';
import handleUnedit from '../../utility/handleUnedit';
import fetchItems from '../../utility/fetchItems';
import './Task.css'

const Task = () => {
    const initialTaskConfig = { 
        title: '',
        description: '',
        priority: 'low',
        status: 'pending',
    };

    const [taskConfig, setTaskConfig] = useState({ ...initialTaskConfig });
    const [taskItems, setTaskItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskConfig(prevConfig => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const fetchTaskItems = () => {
        fetchItems({url:TASK_PLOT, setItems:setTaskItems, setErrorMessage:setErrorMessage});
    };

    useEffect( () => {
        fetchTaskItems();
    },[]);

    const handleSubmitTask = async(event) => {
        event.preventDefault();
        await handleSubmit({url:TASK, data:taskConfig, setMessage:setErrorMessage, message:"Can't submit Task"}); 
        fetchTaskItems();  
        setTaskConfig(initialTaskConfig);
    };

    const handleEditTask = (taskId) => {
        handleEdit({items:taskItems, setItems:setTaskItems ,setConfig:setTaskConfig, id:taskId});
    };

    const handleDeleteTask = (taskId) => {
        handleDelete({url:TASK, id:taskId, fetchItems:fetchTaskItems, setError:setErrorMessage});
    };

    const handleUneditTask = () => {
        handleUnedit({items:taskItems, setItems:setTaskItems, setConfig:setTaskConfig, initialConfig:initialTaskConfig, setError:setErrorMessage});
    };

    const renderTaskItem = (item) => (
        <>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Priority:</strong> {item.priority}</p> 
            <p><strong>Status:</strong> {item.status}</p> 
            <div className="goal-form">
                {item.isEdited ? (
                    <button onClick={() => handleUneditTask()}>Unedit</button>
                ) : (
                    <>
                        <button onClick={() => handleEditTask(item.id)} className="goal-form-button">Edit</button>
                        <button onClick={() => handleDeleteTask(item.id)} className="goal-form-button">Delete</button>
                    </>
                )}
            </div>
        </>
    );

    const hasTaskItems = taskItems.length > 0;

    return (
        <div className='task-container'>
            <div className='form-section'>
                <form onSubmit={handleSubmitTask}>
                    <h2>Task</h2>
                    <label>
                        Title:
                        <input 
                            type="text" 
                            name="title" 
                            maxLength="50"
                            value={taskConfig.title} 
                            onChange={handleChange}
                            required 
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea 
                            name="description" 
                            value={taskConfig.description} 
                            onChange={handleChange}
                            className="description"
                        ></textarea>
                    </label>
                    <br />
                    <label>
                        Priority:
                        <select 
                            name="priority" 
                            value={taskConfig.priority} 
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
                            value={taskConfig.status} 
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
                        title="All Tasks"
                        items={taskItems}
                        renderItem={renderTaskItem}
                    />
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
        
    );
};

export default Task;