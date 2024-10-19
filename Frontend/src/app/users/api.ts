import axios from 'axios';
import authHeader from './authHeader';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Cái request sẽ là địa chỉ này, còn cái @CrossOrgin là để chỉ địa chỉ của local host front end
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const logIn = async (email: string ,password: string ) => {
    try {
      const response = await axiosInstance.post('/authenticate',{ email, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const signUp = async (data: any) => {
    try {
        const response = await axiosInstance.post('/users', data);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const logOut = () => {
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}