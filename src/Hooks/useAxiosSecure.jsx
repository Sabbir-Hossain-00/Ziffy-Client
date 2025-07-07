import axios from "axios";
import { useNavigate } from "react-router";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL ,
    withCredentials: true ,
});

export const useAxiosSecure = ()=>{
    const navigate = useNavigate();
    axiosInstance.interceptors.response.use((res)=>{
        return res ;
    },(error)=>{
        if(error.status === 403 || error.status === 401){
            navigate("/forbidden")
        }
        return Promise.reject(error)
    })
    return axiosInstance ;
}