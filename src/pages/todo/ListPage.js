import { useSearchParams } from "react-router-dom";
import ListComponent from "../../component/todo/ListComponent";

function ListPage(){
    
    const [queryParams] = useSearchParams();
    
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    
    return(
        
        <div>
            <p>List Page---{page}---{size}</p>
            <ListComponent/>
        </div>
    
    )
}
export default ListPage;