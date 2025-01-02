import { RouterProvider } from "react-router-dom";
import root from "./router/root"
import './css/App.css'
import './css/BasicLayout.css'

function App(){
    return(
        <RouterProvider router={root}/>
    )
}

export default App;