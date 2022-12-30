import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../../Layout";
import BudgetListPage from "./BudgetList/BudgetListPage";

const Budgets = () => {
    return (
        <AppLayout>
            <Routes>
                {/*<Route path={"/edit/:transactionId"} element={<EditTransaction />} />*/}
                {/*<Route path={"/add"} element={<RegisterTransaction />} />*/}
                {/*<Route*/}
                {/*    path={"/:transactionId/details"}*/}
                {/*    element={<TransactionDetails />}*/}
                {/*/>*/}
                <Route path={"/"} element={<BudgetListPage />} />
            </Routes>
        </AppLayout>
    );
};

export default Budgets;
