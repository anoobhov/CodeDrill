import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'http://https://codedrill-c3ki.onrender.com/',
    withCredentials: true,//token bhi bhejna
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;