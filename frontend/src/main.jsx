import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import reduxStore from "./redux-store/index.js";
import { SocketContextProvider } from "./contexts/Socket.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <SocketContextProvider>
                <App />
            </SocketContextProvider>
        </Provider>
    </React.StrictMode>
);
