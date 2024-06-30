const handleUnedit = async({items, setItems, setConfig, initialConfig, setError}) => {
    try{

        const updatedItems = items.map((item) => ({
            ...item,
            isEdited: false,
        }));

        setItems(updatedItems);
        setConfig(initialConfig);
        
    }catch(error){
        console.log(error);
        setError("Error...");
    }
}

export default handleUnedit;