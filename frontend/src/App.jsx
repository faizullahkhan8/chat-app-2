import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer
                theme="colored"
                position="bottom-right"
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                autoClose={2000}
            />
        </>
    );
}

export default App;
