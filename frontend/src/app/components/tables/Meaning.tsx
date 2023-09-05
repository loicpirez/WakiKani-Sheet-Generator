"use client"

import React from 'react';

interface MeaningProps {
    meaning: {
        accepted_answer: boolean;
        meaning: string;
        primary: boolean;
    };
    index: number;
}

const Meaning: React.FC<MeaningProps> = ({ meaning, index }) => (
    <div key={`meaning-${index}`} className={`${meaning.primary ? "font-medium" : ""} ${!meaning.accepted_answer ? "line-through" : ""}`}>
        {meaning.meaning}
    </div>
);

export default Meaning;