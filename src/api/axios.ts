import axios from "axios";
const API_URL = "https://proyecto-micros.onrender.com";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default instance;
