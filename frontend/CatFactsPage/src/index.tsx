import {createRoot} from "react-dom/client";
import {Api} from "./api/api";
import axios from "axios";
import React, {StrictMode} from "react";
import {LoadingContextProvider} from "./shared/Context/LoadingContext";
import Routing from "./components/Main/Routing";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

export const api = new Api();

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

root.render(
    <StrictMode>
        <LoadingContextProvider>
            <Routing />
        </LoadingContextProvider>
    </StrictMode>
);
