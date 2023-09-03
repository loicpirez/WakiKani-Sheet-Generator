"use client"

import React from 'react';
import { useWakinakiDataContext } from './context/WakinakiData';
import ErrorPage from './components/ErrorPage';
import LoadingPage from './components/LoadingPage';
import withDataHandling from './components/HigherOrderComponent';

const Home = ({ data } : {data: ApiResponseType}): JSX.Element => {
    return (
        <div className='grid h-screen place-items-center'>
            Ready, loaded {data && data.kanjis.length || 0} kanjis and {data && data.vocabularies.length || 0} vocabularies from WakiNaki.
        </div>
    );
}

export default withDataHandling(Home);
