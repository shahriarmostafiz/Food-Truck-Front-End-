import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
const instance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})
const useAxios = () => {
    const { logout } = useAuth()
    // const data = useContext(AuthContext)
    // const data = useAuth()
    // console.log(data);
    // const { logout } = data
    // const { logout } = useAuth()

    const navigate = useNavigate()
    instance.interceptors.response.use(res => {
        // console.log(res);
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