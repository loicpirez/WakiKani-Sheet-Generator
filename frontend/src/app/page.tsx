"use client"

import React from 'react';
import { useWakinakiDataContext } from './context/WakinakiData';
import ErrorPage from './components/ErrorPage';
import LoadingPage from './components/LoadingPage';

const Home = (): JSX.Element => {
    const { data, error, loading } = useWakinakiDataContext();

    return (
        <div className='grid h-screen place-items-center'>
            {error ? <ErrorPage error={error} /> : loading ? <LoadingPage /> : (data && <>Ready, loaded {data.kanjis.length} kanjis and {data.vocabularies.length} vocabularies from WakiNaki.</>)}
        </div>
    );
}

export default Home;
