'use client'

import React from 'react';
import { useContextContent } from './utils/Context';

const Kanji = (): JSX.Element => {
    const data = useContextContent('data') as ApiResponseType

    return <div className='grid h-screen place-items-center'>
        {data && data.kanjis.length || 0} kanjis
    </div>;
}


export default Kanji;