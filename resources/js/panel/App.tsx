import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import { login } from "./services/AuthService";
import "./utils/i18n";
import NotFound from "./pages/NotFound";

const App = () => {
    useEffect(() => {
        login();
    }, []);

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="" element={<Navigate to={"transactions"} />} />
                <Route path="transactions/*" element={<Transactions />} />
                <Route path="accounts/*" element={<Accounts />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;