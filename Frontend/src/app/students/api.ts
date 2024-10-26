import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Cái request sẽ là địa chỉ này, còn cái @CrossOrgin là để chỉ địa chỉ của local host front end
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const login = async (email: string ,password: string ) => {
    try {
      const response = await axiosInstance.post('/students?email=' + email + '&password=' + password);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const login2 = async(email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/authenticate', { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

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


// export const getStudent = async () => {
//     try {
//         const response = await axiosInstance(`/students/`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

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
