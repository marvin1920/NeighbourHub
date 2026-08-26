import axios from "axios";

const API = axios.create({
  baseURL: "https://neighbourhub-3.onrender.com/api"
});

export default API;