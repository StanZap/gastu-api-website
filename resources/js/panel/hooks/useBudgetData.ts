import { useEffect, useState } from "react";
import { useStore } from "../store";
import { fetchBudgets } from "../services/BudgetsService";

const useBudgetData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMap, setErrorMap] = useState();
    const { budgets, setBudgets } = useStore((state) => ({
        budgets: state.budgetData?.data || [],
        setBudgets: state.setBudgetData,
    }));

    const load = (params = {}) => {
        setIsLoading(true);
        fetchBudgets(params)
            .then((resp) => {
                setBudgets(resp);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                alert(
                    "Ocurrió un error. Inténtelo de nuevo más tarde. Estado de Respuesta: " +
                        e.status
                );
            });
    };

    useEffect(() => {
        if (isLoading || budgets.length > 0) return;
        load();
    }, []);

    return {
        budgets,
        isLoading,
        errorMap,
    };
};

export default useBudgetData;
