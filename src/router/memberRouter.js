import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>

const Login = lazy(()=> import( '../pages/member/LoginPage'))

const memberRouter = () => {
    return [
        {
            path : "",
            element : <Navigate replace to="login"/>
        },
       {
            path : "login",
            element : <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path : "logout",
            element : <Navigate replace to="login"/>
        },
    ]
}

export default memberRouter;