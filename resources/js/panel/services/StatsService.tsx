import httpClient, { handleLoginError } from "../utils/httpClient";

const fetchGlobalStats = async (month) => {
    try {
        const params = month ? { month } : {};
        const res = await httpClient.get("api/me/stats/global", {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
        throw e.response;
    }
};

const fetchMonthlyStats = async (params) => {
    try {
        const res = await httpClient.get("api/me/stats/monthly", {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
        throw e.response;
    }
};

const fetchMonthClosureStats = async (params) => {
    try {
        const res = await httpClient.get("api/me/stats/closure", {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
        throw e.response;
    }
};

export { fetchGlobalStats, fetchMonthlyStats, fetchMonthClosureStats };
