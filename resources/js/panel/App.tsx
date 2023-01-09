import React, { useEffect } from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import { login } from "./services/AuthService";
import "./utils/i18n";
import NotFound from "./pages/NotFound";
import MonthlyStatsList from "./pages/Stats/MonthlyStatsList";
import Budgets from "./pages/Budget/pages/Budgets";
import Closure from "./pages/Closure";

const App = () => {
    useEffect(() => {
        login();
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="" element={<Navigate to={"stats"} />} />
                <Route path="transactions/*" element={<Transactions />} />
                <Route path="accounts/*" element={<Accounts />} />
                <Route path="stats/*" element={<MonthlyStatsList />} />
                <Route path="budgets/*" element={<Budgets />} />
                <Route path="closure" element={<Closure />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        ),
        { basename: "/" }
    );

    return <RouterProvider router={router} />;
};

export default App;
