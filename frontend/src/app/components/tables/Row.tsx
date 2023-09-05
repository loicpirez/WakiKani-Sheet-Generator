"use client"

import React, { useEffect, useState } from 'react';

import SanitizeHTML from '../SanitizeHTML';
import Character from './Character';
import Meaning from './Meaning';
import Reading from './Reading';

interface RowProps {
  content: {
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
  };
  index: number;
  page: 'kanji' | 'vocabulary' | 'radicals'; // @TODO: Enum
}

const Row: React.FC<RowProps> = ({ content, index, page }) => (
  <tr key={index}>
    <td>{content.level}</td>
    <td>
      <Character character={content.characters} />
    </td>
    <td>{content.meaning.map((meaning, i) => <Meaning key={`${page}-${index}-meaning-${i}`} meaning={meaning} index={i} />)}</td>
    <td><SanitizeHTML html={content.meaning_mnemonic} /></td>
    <td className="whitespace-nowrap">{content.reading.map((reading, i) => <Reading key={`${page}-${index}-reading-${i}`} reading={reading} index={i} />)}</td>
    <td><SanitizeHTML html={content.reading_mnemonic} /></td>
  </tr>
);
export default Row