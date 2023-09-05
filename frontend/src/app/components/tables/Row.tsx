"use client"

import React, { useEffect, useState } from 'react';

import SanitizeHTML from '../SanitizeHTML';
import Character from './Character';
import Meaning from './Meaning';
import Reading from './Reading';

interface RowProps {
  content: BaseElementType | VocabularyElementType | RadicalsElementType;
  index: number;
  type: TypeElementType;
}

const Row: React.FC<RowProps> = ({ content, index, type }) => (
  <tr key={index}>
    <td>{content.level}</td>
    <td className="whitespace-nowrap">
      <Character character={content.characters} />
    </td>
    <td>{content.meaning.map((meaning, i) => <Meaning key={`${type}-${index}-meaning-${i}`} meaning={meaning} index={i} />)}</td>
    <td><SanitizeHTML html={content.meaning_mnemonic} /></td>
    {
      type !== 'radical' &&
      <>
        <td className="whitespace-nowrap">{content.reading.map((reading, i) => <Reading key={`${type}-${index}-reading-${i}`} reading={reading} index={i} type={type} />)}</td>
        <td><SanitizeHTML html={content.reading_mnemonic} /></td>
      </>
    }
  </tr>
);
export default Row