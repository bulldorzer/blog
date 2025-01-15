import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams,useSearchParams } from "react-router-dom";

import ReadComponent from "../../component/todo/ReadComponent";

const ReadPage = ({tno})=>{
    
    // const {tno} = useParams() // 반환값 객체중에서 해당 프로퍼티 값 추출
    // http://localhost:3000/todo/list/33
    // Todo Read Page - 33
   

    const [queryParams] = useSearchParams();
    
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({page,size}).toString(); // ?page=1&size=10

    
    return(
        <div>
            <h3>Todo Read Page - {tno}</h3>
            <ReadComponent tno={tno}></ReadComponent>
        </div>
    )
}

export default ReadPage;