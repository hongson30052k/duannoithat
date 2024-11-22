import axios from "axios";

export const axiosInstanceUser = axios.create({
  baseURL: "https://6725faf5c39fedae05b67f2d.mockapi.io/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceUser.interceptors.request.use(
  function (config) {
    const request = {
      ...config,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstanceUser.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
