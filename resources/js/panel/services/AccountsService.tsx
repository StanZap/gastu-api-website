import httpClient, { handleLoginError } from "../utils/httpClient";

const accountsUrl = "api/me/accounts";

export async function fetchAccounts(params) {
  try {
    const res = await httpClient.get(accountsUrl, {
      params,
    });
    return res.data;
  } catch (e) {
    if (e.response.status === 401) handleLoginError();
  }
}

export async function fetchAccountId(id: string) {
  try {
    const res = await httpClient.get(`${accountsUrl}/${id}`);
    return res.data;
  } catch (e) {
    if (e.response.status === 401) handleLoginError();
  }
}
export async function saveAccount(payload) {
  if (payload.id) {
    const accountId = payload.id;
    delete payload.id;
    return updateAccount(accountId, payload);
  }
  return createAccount(payload);
}

export async function createAccount(payload) {
  try {
    const res = await httpClient.post(accountsUrl, payload);
    return res;
  } catch (e) {
    if (e?.response?.status === 401) {
      handleLoginError();
      return;
    }
    return e?.response;
  }
}

export async function updateAccount(id, payload) {
  try {
    const res = await httpClient.patch(`${accountsUrl}/${id}`, payload);
    return res;
  } catch (e) {
    if (e?.response?.status === 401) {
      handleLoginError();
      return;
    }
    return e?.response;
  }
}
