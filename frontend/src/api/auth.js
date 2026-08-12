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
const google = async () => {
  // return axios.post(window.location.href = `${import.meta.env.VITE_BASEURL}/users/google`);
  return axios.post(
    window.open(`${import.meta.env.VITE_BASEURL}/users/google`, "_self"),
  );
};
export { login, signup, google };
