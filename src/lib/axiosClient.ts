import axios from 'axios';
import useProfile from "@/hooks/useProfile";


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {

        const {profile} = useProfile.getState();

        if (profile && profile.token) {
            config.headers.Authorization = `Bearer ${profile.token || ""}`;
        }

        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
