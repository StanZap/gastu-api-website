import { useEffect, useState } from "react";
import { useStore } from "../store";
import { fetchAccounts } from "../services/AccountsService";
import { getAllParams } from "../pages/Accounts/utils";
import { useSearchParams } from "react-router-dom";
import { ParamsFiltersMap } from "../utils/types";

const useAccountListData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchParams, setFetchParams] = useState<ParamsFiltersMap>();

  const { accountList, setAccountList, sortingMap, setSortingMap } = useStore(
    (state) => {
      return {
        accountList: state.accountList,
        setAccountList: state.setAccountList,
        sortingMap: state.sortingMap,
        setSortingMap: state.setSortingMap,
      };
    }
  );

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
    fetchAccounts(fetchParams)
      .then((resp) => {
        setAccountList(resp);
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
    if (accountList?.data || isLoading) return;
    load();
  }, [accountList]);

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

  return { isLoading, accountList, sort, searchParams };
};

export default useAccountListData;
