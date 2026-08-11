import axios from "axios";

const login = (data) => {
  return axios.post(`${import.meta.env.VITE_BASEURL}/users/login`, data, {
    withCredentials: true,
  });
};

const signup = async (data) => {
  return axios.post(`${import.meta.env.VITE_BASEURL}/users/register`, data, {
    withCredentials: true,
  });
};
export { login,signup };
