"use client"
import {getAllUsers} from "@/app/users/api";
import authHeader from "@/app/users/authHeader";
import Link from "next/link";
import {useState, useEffect} from "react";


const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res);
        });
    }, []);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 && users.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Home