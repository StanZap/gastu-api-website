import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/TransactionService";
import { Transaction } from "../pages/Transactions/types";

const useTransactionListSummary = (filters) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const load = async () => {
        try {
            const resp = await fetchTransactions(filters);
            setTransactionList(resp.data);
        } catch (e) {
            alert(
                "Ocurrió un error. Inténtelo de nuevo más tarde. Estado de Respuesta: " +
                    e.response.status
            );
        }
    };

    useEffect(() => {
        if (isLoading || !filters) return;
        setIsLoading(true);
        load();
        setIsLoading(false);
    }, [filters]);

    return { isLoading, transactionList };
};

export default useTransactionListSummary;
