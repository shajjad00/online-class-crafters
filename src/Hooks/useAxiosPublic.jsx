import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://class-crafters-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

// http://localhost:5000
