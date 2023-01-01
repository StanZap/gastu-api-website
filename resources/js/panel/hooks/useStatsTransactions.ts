import { useEffect, useState } from "react";
import { Transaction } from "../pages/Transactions/types";
import {
    fetchMyStatsTransactions,
    fetchTeamStatsTransactions,
} from "../services/StatsTransactionService";

const useStatsTransactions = (filters, isTeamStats = true) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const load = async () => {
        try {
            let resp;
            if (isTeamStats) {
                resp = await fetchTeamStatsTransactions(filters);
            } else {
                resp = await fetchMyStatsTransactions(filters);
            }
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

export default useStatsTransactions;
