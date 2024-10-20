import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://e-comm-biding.onrender.com', 
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
})

