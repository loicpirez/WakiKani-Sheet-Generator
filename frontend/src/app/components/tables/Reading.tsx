"use client"

import React, { useEffect, useState } from 'react';

interface ReadingProps {
    reading: ReadingType;
    index: number;
    type: TypeElementType
}

const Reading: React.FC<ReadingProps> = ({ reading, index, type }) => (
    <div key={`reading-${index}`} className={`${reading.primary ? "font-bold text-base" : ""}${!reading.accepted_answer ? "line-through" : ""}`}>
        <span className='ja'>{reading.reading}</span>
        { type === 'kanji' && <span className='reading-type'>({reading.type.replace('yomi', '')})</span> }
    </div>
);

export default Reading;