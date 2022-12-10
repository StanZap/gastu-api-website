import httpClient, { handleLoginError } from "../utils/httpClient";

const profileUrl = "api/me/profile";

export async function fetchProfile() {
  try {
    const res = await httpClient.get(profileUrl);
    return res;
  } catch (e) {
    if (e.response.status === 401) handleLoginError();
    return e.response;
  }
}
