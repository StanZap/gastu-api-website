import { useEffect, useState } from "react";
import { useStore } from "../store";
import { fetchTransactionById } from "../services/TransactionService";

const useTransactionListData = (transactionId?: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { transactionData, setTransactionData } = useStore((state) => {
    return {
      transactionData: state.transactionData,
      setTransactionData: state.setTransactionData,
    };
  });

  const load = () => {
    setIsLoading(true);
    fetchTransactionById(transactionId)
      .then((resp) => {
        setTransactionData(resp.data);
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
  }, [transactionId]);

  useEffect(() => {
    if (transactionData?.data || isLoading) return;
    load();
  }, [transactionData]);

  return { isLoading, transactionData };
};

export default useTransactionListData;
