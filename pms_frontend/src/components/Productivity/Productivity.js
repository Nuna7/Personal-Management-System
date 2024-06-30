import React, { useState, useEffect } from 'react';
import { PRODUCTIVITY, PRODUCTIVITY_PLOT } from '../../utility/constants';
import ItemBlock from '../UI/ItemBlock';
import OptionInput from '../UI/optionInput';
import fetchItems from '../../utility/fetchItems';
import handleDelete from '../../utility/handleDelete';
import handleEdit from '../../utility/handleEdit';
import handleUnedit from '../../utility/handleUnedit';
import './Productivity.css'
import handleSubmit from '../../utility/handleSubmit';

const ProductivityMode = () => {

    const options = [
        {'value':'Monday','label':'Monday'}, 
        {'value':'Tuesday','label':'Tuesday'}, 
        {'value':'Wednesday','label':'Wednesday'}, 
        {'value':'Thursday','label':'Thursday'}, 
        {'value':'Friday','label':'Friday'}, 
        {'value':'Saturday','label':'Saturday'}, 
        {'value':'Sunday','label':'Sunday'}
    ]

    const initialProdConfig = { 
        start_time: '',
        end_time: '',
        selected_day: 'Monday'
    };

    const [productivityConfig, setProductivityConfig] = useState({ ...initialProdConfig });
    const [productivityItems, setProductivityItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductivityConfig({
            ...productivityConfig,
            [name]: value
        });
    };

    const fetchProdItems = () => {
        fetchItems({url:PRODUCTIVITY_PLOT, setItems:setProductivityItems, setErrorMessage:setErrorMessage});
    };

    useEffect(() => {
        fetchProdItems();
    }, []);

    const handleSubmitProd = async(event) => {
        try{
            event.preventDefault();
            await handleSubmit({url:PRODUCTIVITY, data:productivityConfig, 
                            setMessage:setErrorMessage, message:"Can't submit Productivity"}); 
            fetchProdItems();  
            setProductivityConfig(initialProdConfig);

            setErrorMessage('');
        }catch(error){
            setErrorMessage('Failed to submit the form. Please try again.')
        }
    };


    const handleEditProd = (prodId) => {
        handleEdit({items:productivityItems, setItems:setProductivityItems,setConfig:setProductivityConfig, id:prodId});
    };

    const handleDeleteProd = (prodId) => {
        handleDelete({url:PRODUCTIVITY, id:prodId, fetchItems:fetchProdItems, setError : setErrorMessage});
    };

    const handleUneditProd = () => {
        handleUnedit({items:productivityItems, setItems:setProductivityItems, setConfig:setProductivityConfig, 
                initialConfig:initialProdConfig, setError: setErrorMessage});
        
    };


    const renderProductivityItem = (item) => (
        <>
            <p><strong>Start Time:</strong> {item.start_time}</p>
            <p><strong>End Time:</strong> {item.end_time}</p>
            <p><strong>Day:</strong> {item.selected_day}</p>
            <div className="goal-form">
                {item.isEdited ? (
                    <button onClick={handleUneditProd} >Unedit</button>
                ) : (
                    <>
                        <button onClick={() => handleEditProd(item.id)} className="goal-form-button">Edit</button>
                        <button onClick={() => handleDeleteProd(item.id)} className="goal-form-button">Delete</button>
                    </>
                )}
            </div>
        </>
    );

    const hasProductivityItems = productivityItems.length > 0;
       
    return (
        <div className='productivity-container'>
            <div className='form-section'>
                <form onSubmit={handleSubmitProd}>
                    <h2>Productivity Mode</h2>
                    <div className="form-group">

                        <label>Start Time:</label>
                        <input type="time" name="start_time" value={productivityConfig.start_time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Time:</label>
                        <input type="time" name="end_time" value={productivityConfig.end_time} onChange={handleChange} />
                    </div>
                    <OptionInput id="selected_day" name="selected_day" label="Select Day of the Week:" options={options}
                        value={productivityConfig.selected_day} onChange={handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {hasProductivityItems && (
                <div className='display-section'>
                    <ItemBlock
                        title="All Productivity Modes"
                        items={productivityItems}
                        renderItem={renderProductivityItem}
                    />
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    );
};

export default ProductivityMode;
