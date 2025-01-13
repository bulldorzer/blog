import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화
import { Navigate } from "react-router-dom";

const Loading = <div>Loading</div>
const TodoAdd = lazy(()=>import("../pages/todo/AddPage"));
const TodoList = lazy(()=>import("../pages/todo/ListPage"));
const TodoRead = lazy(()=>import("../pages/todo/ReadPage"));
const TodoModify = lazy(()=>import("../pages/todo/ModifyPage"));

const todoRouter = () =>{
    return [
        {
            path : "",
            element : <Navigate replace to="list"/>
        },
        {
            path : "list",
            element : <Suspense fallback={Loading}><TodoList/></Suspense>
        },
        {
            path : "add",
            element : <Suspense fallback={Loading}><TodoAdd/></Suspense>
        },
        {
            path : "read/:tno", // URL에 파라미터 담아옴
            element : <Suspense fallback={Loading}><TodoRead/></Suspense>
        },
        {
            path : "modify/:tno", // URL에 파라미터 담아옴
            element : <Suspense fallback={Loading}><TodoModify/></Suspense>
        }
    ]
}

export default todoRouter;