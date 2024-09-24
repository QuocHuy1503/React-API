import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const getStudents = async () => {
    try {
        const response = await axiosInstance("/students");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createStudent = async (data: any) => {
    try {
        const response = await axiosInstance.post("/students", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateStudent = async (id: string | undefined, data: any) => {
    try {
        const response = await axiosInstance.put(`/students/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteStudent = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/students/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
