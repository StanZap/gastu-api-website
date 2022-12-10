import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import { login } from "./services/AuthService";
import "./utils/i18n";

const App = () => {
  login();

  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="" element={<Navigate to={"transactions"} />} />
        <Route path="transactions/*" element={<Transactions />} />
        <Route path="accounts/*" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
