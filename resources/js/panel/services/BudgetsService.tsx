import httpClient, { handleLoginError } from "../utils/httpClient";

const budgetUrl = "api/me/budgets";

export async function fetchBudgets(params) {
    try {
        const res = await httpClient.get(budgetUrl, {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
    }
}

export async function saveBudget(payload) {
    if (payload.id) {
        const budgetId = payload.id;
        delete payload.id;
        return updateBudget(budgetId, payload);
    }
    return createBudget(payload);
}

export async function createBudget(payload) {
    try {
        const res = await httpClient.post(budgetUrl, payload);
        return res;
    } catch (e) {
        if (e?.response?.status === 401) {
            handleLoginError();
            return;
        }
        return e?.response;
    }
}

export async function updateBudget(id, payload) {
    try {
        const res = await httpClient.patch(`${budgetUrl}/${id}`, payload);
        return res;
    } catch (e) {
        if (e?.response?.status === 401) {
            handleLoginError();
            return;
        }
        return e?.response;
    }
}
