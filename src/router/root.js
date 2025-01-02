import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화


const Loading = <div>Loading</div>

// 필요할 때만 랜더링하여 속도를 최적화 함 -> 랜더링 전까지는 다운로드 하지 않음
const Main = lazy(()=>import("../pages/MainPage")); 
const About = lazy(()=>import("../pages/AboutPage")) ;
const Blog = lazy(()=>import("../pages/BlogPage")) ;
const TodoIndex = lazy(()=>import("../pages/todo/IndexPage")) ;
const TodoList = lazy(()=>import("../pages/todo/ListPage"));
const TodoAdd = lazy(()=>import("../pages/todo/AddPage"));

const root = createBrowserRouter([
    {
        path : "",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path : "about",
        element : <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path : "blog",
        element : <Suspense fallback={Loading}><Blog/></Suspense>
    },{
        path : "todo",
        element : <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children : [
            {
                path : "list",
                element : <Suspense fallback={Loading}><TodoList/></Suspense>
            },
            {
                path : "add",
                element : <Suspense fallback={Loading}><TodoAdd/></Suspense>
            }
        ]
    },
])

export default root;