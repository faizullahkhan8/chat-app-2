import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";

export const Router = createBrowserRouter([
    {
        path: "/Register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
