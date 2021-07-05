import axios from 'axios';
const { NEXT_PUBLIC_API_URL } = process.env;

const api = axios.create({
    baseURL: NEXT_PUBLIC_API_URL
});


export default api;