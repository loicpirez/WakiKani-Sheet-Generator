"use client"

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import withDataHandling from '../components/HigherOrderComponent';
import SanitizeHTML from '../components/SanitizeHTML';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open }) => {
  const modalClass = cn({
    'modal modal-open': open,
    'modal modal-closed': !open,
  });

  return (
    <div className={modalClass}>
      <div className="modal-box">{children}</div>
    </div>
  );
};

interface CharacterProps {
  character: string;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCharacterData(character);
    }
  }, [isOpen, character]);

  const fetchCharacterData = (character: string) => {
    fetch(`https://jisho.org/search/${encodeURI(character)}%20%23kanji`)
      .then((response) => response.text())
      .then((data) => {
        const strokeOrderSvg = data.match(/var url = '\/\/(.+)';/);

        if (!strokeOrderSvg) return;

        fetch(`https://${strokeOrderSvg[1]}`)
          .then((response) => response.text())
          .then((svgText) => {
            const cleanedSvgText = svgText
              .replace(/<!DOCTYPE svg [^>]*>/, '') // Remove DOCTYPE
              .replace(/<!ATTLIST[^>]*>/g, '') // Remove <!ATTLIST declarations
              .replace(/]\s*>/g, ''); // Remove extra ]> that appears at the end of the <!ATTLIST declarations

            setData(cleanedSvgText);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  return (
    <>
      <span className='character ja' onClick={toggleModal}>
        {character}
      </span>
      <Modal open={isOpen}>
        <div className="p-1">
          <h2 className="text-xl font-bold mb-4">Character Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex justify-center items-center'>
              <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
          )}
          <button className="btn mt-4" onClick={toggleModal}>Close</button>
        </div>
      </Modal>
    </>
  );
};

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

interface KanjiRowProps {
  kanji: {
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
}

const KanjiRow: React.FC<KanjiRowProps> = ({ kanji, index }) => (
  <tr key={index}>
    <td>{kanji.level}</td>
    <td>
      <Character character={kanji.characters} />
    </td>
    <td>{kanji.meaning.map((meaning, i) => <Meaning key={`kanji-${index}-meaning-${i}`} meaning={meaning} index={i} />)}</td>
    <td><SanitizeHTML html={kanji.meaning_mnemonic} /></td>
    <td className="whitespace-nowrap">{kanji.reading.map((reading, i) => <Reading key={`kanji-${index}-reading-${i}`} reading={reading} index={i} />)}</td>
    <td><SanitizeHTML html={kanji.reading_mnemonic} /></td>
  </tr>
);

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
        {data && data.kanjis && data.kanjis.map((kanji, i) => <KanjiRow key={`kanji-${i}`} kanji={kanji} index={i} />)}
      </tbody>
    </table>
  </div>
);

export default withDataHandling(Kanji);
