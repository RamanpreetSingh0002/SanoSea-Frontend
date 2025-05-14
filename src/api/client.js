import axios from "axios";

// https://sanosea-backend.onrender.com
// http://localhost:8000/api ---> instead of this use live server link after deploying
const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default client;
