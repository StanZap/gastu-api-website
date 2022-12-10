import httpClient from "../utils/httpClient";

const requestCsrf = () => {
  return httpClient.get("sanctum/csrf-cookie");
};

const login = async () => {
  await requestCsrf();
};

const logout = async () => {
  httpClient.post("/api/auth/revoke-token").finally(() => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/login";
  });
};

export { requestCsrf, login, logout };
