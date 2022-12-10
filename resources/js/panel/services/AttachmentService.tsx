import httpClient, { handleLoginError } from "../utils/httpClient";

const attachmentApiUrl = "api/me/attachments";

export async function uploadTransactionAttachment(form) {
  try {
    const res = await httpClient.post(`${attachmentApiUrl}`, form);
    return res;
  } catch (e) {
    if (e.response.status === 401) handleLoginError();
    return e.response?.data;
  }
}
