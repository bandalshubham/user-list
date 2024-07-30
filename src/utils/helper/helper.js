import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    
    },
    
  });