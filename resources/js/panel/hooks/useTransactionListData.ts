import { useEffect, useState } from "react";
import { useStore } from "../store";
import { getAllParams } from "../pages/Accounts/utils";
import { useSearchParams } from "react-router-dom";
import { fetchTransactions } from "../services/TransactionService";

const useTransactionListData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const { transactionList, setTransactionList, sortingMap, setSortingMap } =
        useStore((state) => {
            return {
                transactionList: state.transactionList,
                setTransactionList: state.setTransactionList,
                sortingMap: state.sortingMap,
                setSortingMap: state.setSortingMap,
            };
        });

    const sort = (field: string) => {
        // @ts-ignore
        setSearchParams({
            ...getAllParams(searchParams),
            orderBy: field,
            orderDirection: sortingMap[field] === "asc" ? "desc" : "asc",
        });
    };

    const load = () => {
        const params = getAllParams(searchParams);
        const orderBy = params.orderBy || undefined;
        const orderDirection = params.orderDirection || undefined;
        if (orderDirection && orderBy) {
            setSortingMap({
                ...sortingMap,
                [orderBy]: orderDirection,
            });
        }

        setIsLoading(true);
        fetchTransactions(params)
            .then((resp) => {
                setTransactionList(resp);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                alert(
                    "Ocurrió un error. Inténtelo de nuevo más tarde. Estado de Respuesta: " +
                        e.response.status
                );
            });
    };

    useEffect(() => {
        if (isLoading) return;
        load();
    }, [searchParams]);

    useEffect(() => {
        if (transactionList?.data || isLoading) return;
        load();
    }, [transactionList]);

    return { isLoading, paginatedList: transactionList, sort, searchParams };
};

export default useTransactionListData;
