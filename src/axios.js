import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/fir-540be/us-central1/api' //api url for cloud function
});

export default instance;