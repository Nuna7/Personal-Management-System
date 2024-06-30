import authApi from "../api/authApi";
import getCsrfToken from "./getCsrfToken";

const fetchItems = async ({url, setItems,setErrorMessage, addIsEdited}) => {

    try{
        const response = await authApi.get(url,{
            withCredentials:true,
            'X-CSRFToken' : getCsrfToken()
        });

        if (addIsEdited !== undefined && addIsEdited === true){
            response.data = response.data.map((item) => ({
                ...item,
                isEdited: false,
            }))   
        }

        setItems(response.data);
        

    }catch(error){
        if(setErrorMessage !== undefined){
            setErrorMessage("Unable to fetch items");
        }
    }
}

export default fetchItems;