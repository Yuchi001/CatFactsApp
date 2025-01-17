import React, {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./MainPage";

const Routing: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    </BrowserRouter>
);

export default Routing;
