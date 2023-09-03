"use client"

import React from 'react';
import { useWakinakiDataContext } from '../context/WakinakiData';
import withDataHandling from '../components/HigherOrderComponent';

const Kanji = ({ data } : {data: ApiResponseType}) => {
  return (
    <div className='grid h-screen place-items-center'>
      {data && data.kanjis.length || 0} kanjis
    </div>
  );
}

export default withDataHandling(Kanji);
