"use client"

import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import validUrl from 'valid-url';

// @TODO: handle multiple characters at one
// @TODO: show every step of the stroke order

interface CharacterProps {
  character: string;
}

// @TODO: move this to a utils file
const isValidUrl = (urlString: string): string | undefined => {
  return validUrl.isWebUri(urlString);
};

const Character: React.FC<CharacterProps> = ({ character }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    if (!isValidUrl(character)) {
      setIsOpen(!isOpen);
    }
  }

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
      {
        isValidUrl(character) &&
        <div className='items-center justify-center flex'>
          <img src={character} width={25} height={25} />
        </div>
      }
      {
        !isValidUrl(character) &&
        <span className='character ja' onClick={toggleModal}>
          {character}
        </span>
      }
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

export default Character;