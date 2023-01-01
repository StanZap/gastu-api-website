import httpClient, { handleLoginError } from "../utils/httpClient";

const teamStatsTxUrl = "api/me/stats/team/transactions";
const myStatsTxUrl = "api/me/stats/my/transactions";

export async function fetchTeamStatsTransactions(params) {
    try {
        const res = await httpClient.get(teamStatsTxUrl, {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            handleLoginError();
        }
    }
}

export async function fetchMyStatsTransactions(params) {
    try {
        const res = await httpClient.get(myStatsTxUrl, {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            handleLoginError();
        }
    }
}
