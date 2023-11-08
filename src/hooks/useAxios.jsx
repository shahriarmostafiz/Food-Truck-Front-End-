import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
const instance = axios.create({
    baseURL: "https://food-truck-server.vercel.app/api/v1",
    withCredentials: true
})
const useAxios = () => {
    const { logout } = useAuth()


    const navigate = useNavigate()
    instance.interceptors.response.use(res => {
        return res;
    }, err => {
        console.log(err.response);
        if (err.response.status === 401 || err.response.status === 403) {
            logout()
                .then(navigate('/login'))
                .catch()
        }
    })
    return instance
};

export default useAxios;