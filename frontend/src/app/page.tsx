'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import ErrorPage from './components/ErrorPage';
import LoadingPage from './components/LoadingPage';
import MainComponent from './components/MainComponent';

export const DataContext = createContext<DataContextType | undefined>(undefined);

const fetchData = async (): Promise<ApiResponseType> => {
  return axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/', {
    timeout: 10000,
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      console.log(response)

      return response.data;
    });
}

const Home = (): JSX.Element => {
  const [data, setData] = useState<ApiResponseType>({ kanjis: [], vocabularies: [] });
  const [error, setError] = useState<ApiErrorType>({ message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error.message !== '') {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <DataContext.Provider value={{ data, error, loading }}>
      <MainComponent />
    </DataContext.Provider>
  );
}

export default Home;
