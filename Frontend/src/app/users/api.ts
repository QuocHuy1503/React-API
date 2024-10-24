import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Cái request sẽ là địa chỉ này, còn cái @CrossOrgin là để chỉ địa chỉ của local host front end
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});



export const getUsers = async () => {
    try {
        const response = await axiosInstance("/users");
        // return response.data;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (data: any) => {
    try {
        const response = await axiosInstance.post("/users", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const getUser = async (id: string | undefined, data: any) => {
    try {
        const response = await axiosInstance(`/user/${id}`,data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUser = async (id: string | undefined, data: any) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
