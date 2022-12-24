import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/TransactionService";

const useTransactionListSummary = (filters) => {
    const [transactionList, setTransactionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
        try {
            console.log(filters);
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
