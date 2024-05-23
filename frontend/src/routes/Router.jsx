import { Outlet, createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Home from "../pages/Home/Home.jsx";

import { Protected } from "../components/Protected/Protected.jsx";

const Layout = () => {
    return (
        <div className="flex flex-col gap-4">
            <Navbar />
            <Outlet />
        </div>
    );
};

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <Protected>
                        <Home />,
                    </Protected>
                ),
            },
        ],
    },
    {
        path: "/Register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
