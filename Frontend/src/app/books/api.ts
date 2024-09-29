import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const getBooks = async () => {
    try {
        const response = await axiosInstance("/books");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createBook = async (data: any) => {
    try {
        const response = await axiosInstance.post("/books", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateBook = async (id: string | undefined, data: any) => {
    try {
        const response = await axiosInstance.put(`/books/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteBook = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
