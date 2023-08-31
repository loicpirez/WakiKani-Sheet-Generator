'use client'

import React, { createContext, useContext } from 'react';
import { useContextContent } from './utils/Context';

const Home = (): JSX.Element => {
    const data = useContextContent('data') as ApiResponseType

    return <div className='grid h-screen place-items-center'>
        {
            data && <>Ready, loaded {data.kanjis.length} kanjis and {data.vocabularies.length} vocabularies from WakiNaki.</>
        }
    </div>;
}


export default Home;
