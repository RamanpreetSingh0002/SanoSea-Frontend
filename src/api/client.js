import axios from "axios";

// https://sanosea-backend.onrender.com/api
// http://localhost:8000/api ---> instead of this use live server link after deploying
const client = axios.create({
  baseURL: "https://sanosea-backend.onrender.com/api",
});

export default client;
