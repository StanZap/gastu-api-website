import httpClient, { handleLoginError } from "../utils/httpClient";

const transactionsApiUrl = "api/me/transactions";

export async function fetchTransactions(params) {
    try {
        const res = await httpClient.get(transactionsApiUrl, {
            params,
        });
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            handleLoginError();
        }
    }
}

export async function fetchTransactionById(id) {
    try {
        const res = await httpClient.get(`${transactionsApiUrl}/${id}`);
        return res;
    } catch (e) {
        if (e.response.status === 401) {
            handleLoginError();
        }
        return e;
    }
}

export async function addTransaction(payload) {
    try {
        const res = await httpClient.post(transactionsApiUrl, payload);
        return res;
    } catch (e) {
        if (e.response.status === 401) {
            handleLoginError();
            return;
        }
        return e.response;
    }
}

export async function updateTransaction(id, payload) {
    try {
        const res = await httpClient.patch(
            `${transactionsApiUrl}/${id}`,
            payload
        );
        return res;
    } catch (e) {
        if (e.response.status === 401) handleLoginError();
        return e.response;
    }
}
