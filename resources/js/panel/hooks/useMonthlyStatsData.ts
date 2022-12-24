import { useEffect, useState } from "react";
import { useStore } from "../store";
import { fetchMonthlyStats } from "../services/StatsService";
import { useSearchParams } from "react-router-dom";

const useMonthlyStats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { monthlyStats, setMonthlyStats } = useStore((state) => {
        return {
            monthlyStats: state.monthlyStats,
            setMonthlyStats: state.setMonthlyStats,
        };
    });
    const [searhParams] = useSearchParams();

    const load = async () => {
        setIsLoading(true);
        try {
            const params = {};
            if (searhParams.has("scope")) {
                params["scope"] = searhParams.get("scope");
            }

            const resp = await fetchMonthlyStats(params);
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
    }, [searhParams]);

    useEffect(() => {
        if (monthlyStats?.data || isLoading) return;
        load();
    }, [monthlyStats]);

    return { isLoading, monthlyStats };
};

export default useMonthlyStats;
