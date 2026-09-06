import {createBrowserRouter} from "react-router";
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
import Protect from "./features/auth/components/protect.jsx";


const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protect><h1>home page</h1></Protect>
    }
])

export default router
