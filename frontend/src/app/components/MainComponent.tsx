// TODO: strategy for own KanjiPage and VocabularyPage, default would be stats page

'use client'

import React, { createContext, useContext } from 'react';
import { DataContext } from '../page';

const useData = (): ApiResponseType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }

    return context.data;
}

const MainComponent = (): JSX.Element => {
    const data = useData();

    return <div className='grid h-screen place-items-center'>
        Ready, loaded {data.kanjis.length} kanjis and {data.vocabularies.length} vocabularies from WakiNaki.
    </div>;
}


export default MainComponent;