"use client"

import React from 'react';
import { useWakinakiDataContext } from '../context/WakinakiData';
import ErrorPage from '../components/ErrorPage';
import LoadingPage from '../components/LoadingPage';

const Kanji = (): JSX.Element => {
    const { data, error, loading } = useWakinakiDataContext();

    return <div className='grid h-screen place-items-center'>
        {/* // TODO: error + loading for each page */}
        {error ? <ErrorPage error={error} /> : loading ? <LoadingPage /> : <>{data && data.kanjis.length || 0} kanjis</>}
    </div>;
}

export default Kanji;
