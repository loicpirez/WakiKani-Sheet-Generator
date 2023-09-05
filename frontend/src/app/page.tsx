"use client"

import React from 'react';
import withDataHandling from './components/HigherOrderComponent';
import LoadingPage from './components/LoadingPage';

const NumberOfCharacters = ({ nb, type }: { nb: number, type: string }) => {
    return <kbd className={`kbd m-2 ${type}`}>{nb}</kbd>
}


const Home = ({ data }: { data: ApiResponseType }): JSX.Element => {
    if (!data) {
        return <LoadingPage />
    }

    return (
        <div className='h-32 w-full flex items-center justify-center'>
            Ready! Loaded <NumberOfCharacters nb={data && data.kanjis.length || 0} type="kanji" /> kanjis and <NumberOfCharacters nb={data && data.vocabularies.length || 0} type="vocabulary" /> vocabularies from WakiNaki.
        </div>
    );
}

export default withDataHandling(Home);
