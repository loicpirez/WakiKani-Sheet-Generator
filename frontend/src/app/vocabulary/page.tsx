"use client"

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import withDataHandling from '../components/HigherOrderComponent';
import SanitizeHTML from '../components/SanitizeHTML';

const Reading = ({ reading, index }) => (
    <div key={`reading-${index}`} className={`${reading.primary ? "font-bold text-base" : ""}${!reading.accepted_answer ? "line-through" : ""}`}>
        <span className='ja'>{reading.reading}</span>
    </div>
);

const Meaning = ({ meaning, index }) => {
    return <div key={`meaning-${index}`} className={`${meaning.primary ? "font-medium" : ""} ${!meaning.accepted_answer ? "line-through" : ""}`}>
        {meaning.meaning}
    </div>
};


const VocabularyRow = ({ vocabulary, index }) => {
    return (
        <tr key={index}>
            <td>{vocabulary.level}</td>
            <td className="whitespace-nowrap">
                <span className='character ja'>
                    {vocabulary.characters}
                </span>

            </td>
            <td>{vocabulary.meaning.map((meaning, i) => <Meaning key={`vocabulary-${index}-meaning-${i}`} meaning={meaning} index={i} />)}</td>
            <td><SanitizeHTML html={vocabulary.meaning_mnemonic} /></td>
            <td className="whitespace-nowrap">{vocabulary.reading.map((reading, i) => <Reading key={`vocabulary-${index}-reading-${i}`} reading={reading} index={i} />)}</td>
            <td><SanitizeHTML html={vocabulary.reading_mnemonic} /></td>
        </tr>
    );
};

const Vocabulary = ({ data }) => {
    return (
        <div className="vocabulary-table">
    <table className="table content-center align-middle text-center">
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Characters</th>
                        <th>Meaning</th>
                        <th>Meaning Mnemonic</th>
                        <th>Reading</th>
                        <th>Reading Mnemonic</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.vocabularies &&
                        data.vocabularies.map((vocabulary, index) => (
                            <VocabularyRow key={`vocabulary-${index}`} vocabulary={vocabulary} index={index} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default withDataHandling(Vocabulary);
