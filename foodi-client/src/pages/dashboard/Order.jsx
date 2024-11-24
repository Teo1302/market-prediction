import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Order = () => {
    const { user, loading } = useAuth();
    const [token, setToken] = useState(localStorage.getItem("access_token"));

    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["orders", user?.email],
        enabled: !loading && !!token,
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:6001/payments?email=${user?.email}`,
                {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`, // Include token-ul în header
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Unauthorized');
                }
                throw new Error('Network response was not ok');
            }

            return res.json();
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setToken(token);
    }, [localStorage.getItem("access_token")]);
    
    useEffect(() => {
        if (!loading && !!token) {
            refetch(); // Refetch data când se actualizează token-ul
        }
    }, [token, loading, refetch]);

    console.log("User email:", user.email); // Verifică dacă user.email este corect
    console.log("Token:", token); // Verifică token-ul
    console.log("Data:", data); // Verifică datele primite
    console.log("IsError:", isError); // Verifică dacă există erori
    console.log("IsLoading:", isLoading); // Verifică dacă încă se încarcă

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        if (isError.message === 'Unauthorized') {
            return <div>Token invalid! Autentifica-te iarasi.</div>;
        }
        return <div>Error loading orders</div>;
    }

    const orders = Array.isArray(data) ? data : [];

    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    };
    const handleLoginFormSubmit = async (event) => {
      event.preventDefault();
      await handleLogin(email, password);
  };
  
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="py-28 flex flex-col items-center justify-center">
                    <div className="text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Toate <span className="text-green"> Comenzile Tale</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                <thead className="bg-green text-white rounded-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Data Comanda</th>
                                        <th>ID Tranzactie</th>
                                        <th>Pret</th>
                                        <th>Status</th>
                                        <th>Actiune</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(item.createdAt)}</td>
                                            <td className="font-medium">{item.transitionId}</td>
                                            <td>${item.price}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                                                    Contact
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Order;
