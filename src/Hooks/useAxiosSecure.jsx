import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://class-crafters-server.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
