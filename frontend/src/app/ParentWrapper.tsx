"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "./components/ErrorPage";
import LoadingPage from "./components/LoadingPage";
import Navbar from "./components/Navbar";
import { DataContext } from "./utils/Context";

export default function ParentProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [data, setData] = useState<ApiResponseType>(null);
    const [error, setError] = useState<ApiErrorType>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        try {
            const data = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/', {
                timeout: 10000,
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.data;
                });
            setData(data);
            setLoading(false);
            setError(null);
        } catch (error: any) {
            setError(error);
            setLoading(false);
            setData(null);
        } finally {
            setLoading(false);
            setError(null);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, error, loading, fetchData }}>
            <header className='pb-1'>
                <Navbar />
            </header>
            {error ? <ErrorPage error={error} /> : loading ? <LoadingPage /> : children}
            <footer></footer>
        </DataContext.Provider>
    )
}
