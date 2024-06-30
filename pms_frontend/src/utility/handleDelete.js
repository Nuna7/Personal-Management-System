import authApi from "../api/authApi";

const handleDelete = async({url, id, fetchItems, setError}) => {
    try{
        await authApi.delete(`${url}${id}/`);
        fetchItems();
    }catch(error){
        if(setError !== undefined){
            setError("Unable to delete item.");
        }
        
    }
}

export default handleDelete;