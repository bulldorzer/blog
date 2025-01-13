import { useNavigate } from 'react-router-dom';


function ModifyPage(){

 
    const navigate = useNavigate();

    const moveToRead = () =>{
        navigate({pathname : `/todo/read`})
    }
    
    
    
    const moveToList = () =>{
        
        navigate({pathname : `/todo/list`})
        
    
    }

    return(
        <div>
            <p>Modify Page</p>
        </div>

    )
}
export default ModifyPage;