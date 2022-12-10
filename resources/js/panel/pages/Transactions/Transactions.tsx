import { Route, Routes } from "react-router-dom";
import RegisterTransaction from "./pages/RegisterTransaction";
import TransactionDetails from "./pages/TransactionDetails";
import TransactionList from "./pages/TransactionList";
import { AppLayout } from "../Layout";

const Transactions = () => {
  return (
    <AppLayout>
      <Routes>
        {/*<Route path={"/edit/:transactionId"} element={<EditTransaction />} />*/}
        <Route path={"/add"} element={<RegisterTransaction />} />
        <Route
          path={"/:transactionId/details"}
          element={<TransactionDetails />}
        />
        <Route path={"/"} element={<TransactionList />} />
      </Routes>
    </AppLayout>
  );
};

export default Transactions;
