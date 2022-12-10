import { useEffect, useState } from "react";
import { useStore } from "../store";
import { getAllParams } from "../pages/Accounts/utils";
import { useSearchParams } from "react-router-dom";
import { fetchTransactions } from "../services/TransactionService";
import { ParamsFiltersMap } from "../utils/types";

const useTransactionListData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchParams, setFetchParams] = useState<ParamsFiltersMap>();

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
    setIsLoading(true);
    fetchTransactions(fetchParams)
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
  }, [fetchParams]);

  useEffect(() => {
    if (transactionList?.data || isLoading) return;
    load();
  }, [transactionList]);

  useEffect(() => {
    const params = getAllParams(searchParams);
    const orderBy = params.orderBy || undefined;
    const orderDirection = params.orderDirection || undefined;
    if (orderDirection && orderBy) {
      setSortingMap({
        ...sortingMap,
        [orderBy]: orderDirection,
      });
    }
    setFetchParams(params);
  }, [searchParams]);

  return { isLoading, paginatedList: transactionList, sort, searchParams };
};

export default useTransactionListData;
