
'use client';

import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const WakinakiDataContext = createContext<DataContextType>({
    data: {
        kanjis: [],
        vocabularies: [],
    },
    error: null,
    loading: true,
    fetchData: async () => { },
});

export const WakinakiDataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<ApiResponseType>(null);
    const [error, setError] = useState<ApiErrorType>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        try {
            const data = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/', {
                timeout: 10000,
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.data;
                });
            setData(data);
            setError(null);
        } catch (error: any) {
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <WakinakiDataContext.Provider value={{ data, error, loading, fetchData }}>
            {children}
        </WakinakiDataContext.Provider>
    )
};

export const useWakinakiDataContext = () => useContext(WakinakiDataContext);
