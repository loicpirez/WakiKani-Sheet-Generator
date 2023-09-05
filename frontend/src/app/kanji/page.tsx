"use client"

import React from 'react';

import withDataHandling from '../components/HigherOrderComponent';
import Row from '../components/tables/Row';

interface KanjiProps {
  data: {
    kanjis: {
      characters: string;
      level: number;
      meaning: {
        accepted_answer: boolean;
        meaning: string;
        primary: boolean;
      }[];
      meaning_mnemonic: string;
      reading: {
        accepted_answer: boolean;
        primary: boolean;
        reading: string;
        type: string;
      }[];
      reading_mnemonic: string;
    }[];
  };
}

const Kanji: React.FC<KanjiProps> = ({ data }) => (
  <div className='kanji-table overflow-y-scroll bg-slate-50/50'>
    <table className="table table-sm content-center align-middle text-center">
      <thead>
        <tr>
          <td>Level</td>
          <td>Characters</td>
          <td>Meaning</td>
          <td>Meaning Mnemonic</td>
          <td>Reading</td>
          <td>Reading Mnemonic</td>
        </tr>
      </thead>
      <tbody>
        {data && data.kanjis && data.kanjis.map((kanji, i) => <Row key={`kanji-${i}`} content={kanji} index={i} page="kanji" />)}
      </tbody>
    </table>
  </div>
);

export default withDataHandling(Kanji);
