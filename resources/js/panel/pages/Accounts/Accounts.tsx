import { Route, Routes } from "react-router-dom";
import AddEditAccount from "./pages/AddEditAccount";
import AccountDetails from "./pages/AccountDetails";
import AccountList from "./pages/AccountList";
import { AppLayout } from "../Layout";
const Accounts = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path={"/"} element={<AccountList />} />
                <Route path={"/edit/:accountId"} element={<AddEditAccount />} />
                <Route path={"/add"} element={<AddEditAccount />} />
                <Route path={"/edit/:accountId"} element={<AccountDetails />} />
            </Routes>
        </AppLayout>
    );
};

export default Accounts;
