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
        return e.response;
    }
};

const fetchMonthlyStats = async () => {
    try {
        const res = await httpClient.get("api/me/stats/monthly");
        return res.data;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
        return e.response;
    }
};

export { fetchGlobalStats, fetchMonthlyStats };
