import { useEffect, useState } from "react";
import { useStore } from "../store";
import { ParamsFiltersMap } from "../utils/types";
import { fetchMonthlyStats } from "../services/StatsService";

const useAccountListData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchParams, setFetchParams] = useState<ParamsFiltersMap>();
    const { monthlyStats, setMonthlyStats } = useStore((state) => {
        return {
            monthlyStats: state.monthlyStats,
            setMonthlyStats: state.setMonthlyStats,
        };
    });

    const load = async () => {
        setIsLoading(true);
        try {
            const resp = await fetchMonthlyStats();
            console.log(resp.data);
            setMonthlyStats(resp?.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            alert(
                "Ocurrió un error. Inténtelo de nuevo más tarde. Estado de Respuesta: " +
                    e.response.status
            );
        }
    };

    useEffect(() => {
        if (isLoading) return;
        load();
    }, [fetchParams]);

    useEffect(() => {
        if (monthlyStats?.data || isLoading) return;
        load();
    }, [monthlyStats]);

    return { isLoading, monthlyStats };
};

export default useAccountListData;
