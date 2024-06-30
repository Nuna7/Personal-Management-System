import authApi from "../api/authApi";
import getCsrfToken from "./getCsrfToken";

const handleSubmit = async({url, data, setMessage, message}) => {
    try{

        if(data.isEdited !== undefined || data.id !== undefined){
            await authApi.put(`${url}${data.id}/`, data,{
                withCredentials:true,
                headers:{
                    'X-CSRFToken':getCsrfToken()
                }
            });
       
        }else{
            await authApi.post(url, data,{
                withCredentials:true,
                headers:{
                    'X-CSRFToken':getCsrfToken()
                }
            })
        }
        
        setMessage('');
        
    }catch(error){
        console.log(error);
        if(setMessage !== undefined){
            setMessage(message);

        }
        
    }
}

export default handleSubmit;