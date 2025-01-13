import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams,useSearchParams } from "react-router-dom";
const ReadPage = ()=>{
    
    const {tno} = useParams() // 반환값 객체중에서 해당 프로퍼티 값 추출
    // http://localhost:3000/todo/list/33
    // Todo Read Page - 33
    const navigate = useNavigate()

    const [queryParams] = useSearchParams();
    
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({page,size}).toString(); // ?page=1&size=10

    // 수정 화면으로 이동
    const moveTomodify = useCallback((tno)=>{
        navigate({
            pathname:`/todo/modify/${tno}`,
            search : queryStr
        })
    },[tno,page,size])

    // 리스트 화면 이동
    const moveToList = useCallback(()=>{
        navigate({
            pathname:`/todo/list`,
            search : queryStr
        })
    },[tno,page,size])
    return(
        <div>
            <h3>Todo Read Page - {tno}</h3>
            <button className="modify" onClick={()=>{moveTomodify(tno)}}>수정</button>
            <button className="modify" onClick={()=>{moveToList()}}>목록</button>
        </div>
    )
}

export default ReadPage;