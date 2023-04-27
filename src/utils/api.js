import axios from "axios";

import ENV from "@/utils/env";

const api = axios.create({
  baseURL: ENV.apiUrl,
});

export default api;
