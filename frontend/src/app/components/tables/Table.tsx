"use client"

import React, { use, useEffect, useLayoutEffect, useState } from 'react';

import withDataHandling from '../HigherOrderComponent';
import Row from './Row';

interface TableProps {
  data?: DataElementType;
  type: TypeElementType;
}

const Table: React.FC<TableProps> = ({ data, type }) => {
  const [items, setItems]: [
    DataElementType['kanjis'] | DataElementType['vocabularies'] | DataElementType['radicals'],
    any
  ] = useState([]);

  useLayoutEffect(() => {
    if (type === 'kanji') {
      setItems(data?.kanjis)
    }
    else if (type === 'vocabulary') {
      setItems(data?.vocabularies)
    } else if (type === 'radical') {
      setItems(data?.radicals)
    }
  }, [data?.kanjis, data?.vocabularies, data?.radicals, type]);

  return (
    <div className='kanji-table overflow-y-scroll bg-slate-50/50'>
      <table className="table table-sm content-center align-middle text-center">
        <thead>
          <tr>
            <td>Level</td>
            <td>Characters</td>
            <td>Meaning</td>
            <td>Meaning Mnemonic</td>
            {
              type !== 'radical' &&
              <>
                <td>Reading</td>
                <td>Reading Mnemonic</td>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {items && items.map((item, i) => <Row key={`${type}-${i}`} content={item} index={i} type={type} />)}
        </tbody>
      </table>
    </div>
  );
}

export default withDataHandling(Table);
