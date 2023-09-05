"use client"

import React, { useEffect, useState } from 'react';

interface ReadingProps {
    reading: {
        accepted_answer: boolean;
        primary: boolean;
        reading: string;
        type: string;
    };
    index: number;
}

const Reading: React.FC<ReadingProps> = ({ reading, index }) => (
    <div key={`reading-${index}`} className={`${reading.primary ? "font-bold text-base" : ""}${!reading.accepted_answer ? "line-through" : ""}`}>
        <span className='ja'>{reading.reading}</span> <span className='reading-type'>({reading.type.replace('yomi', '')})</span>
    </div>
);

export default Reading;