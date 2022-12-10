import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const httpClient = axios.create({
  baseURL: backendUrl,
  headers: { Accepts: "application/json" },
});
httpClient.defaults.withCredentials = true;

const handleLoginError = () => {
  window.location.href = backendUrl + "/login";
};

export default httpClient;
export { handleLoginError };
