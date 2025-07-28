import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://codedrill-c3ki.onrender.com/',
    withCredentials: true,//token bhi bhejna
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;