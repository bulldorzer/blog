import { useSearchParams } from "react-router-dom";

function ListPage(){
    
    const [queryParams] = useSearchParams();
    
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    
    return(
        
        <div>
            <p>List Page---{page}---{size}</p>
        </div>
    
    )
}
export default ListPage;