/* eslint-disable react/jsx-key */
import { useMemo, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === '') return;
    setItems((prev) => {
      const newItem = {
        id: uuidv4(),
        text: value,
      };

      return [...prev, newItem];
    });

    inputRef.current.value = '';
  }

  return (
    <div className='bg-zinc-900 min-h-dvh flex items-center justify-center'>
      <div className='bg-stone-200 max-w-[350px] mx-2 flex flex-col gap-2 px-8 py-16 rounded-lg'>
        <h1 className='text-center font-bold text-xl'>Search Item</h1>
        <div>
          <label htmlFor='search'>Search:</label>{' '}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type='search'
            id='search'
            autoComplete='off'
            className='p-2 rounded bg-transparent border-2 border-green-500'
          />
        </div>
        <h1 className='text-center font-bold text-xl mt-8'>Add Item</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='input'>New Item:</label>{' '}
            <input
              ref={inputRef}
              id='input'
              type='text'
              autoComplete='off'
              className='p-2 rounded bg-transparent border-2 border-green-500'
            />
          </div>
          <button
            type='submit'
            className='bg-lime-500 w-full px-4 py-2 rounded mt-2 font-bold'
          >
            ADD
          </button>
        </form>
        <h3>Items:</h3>
        {!filteredItems.length ? (
          <p className='text-violet-500'>No item</p>
        ) : (
          <ul className='flex flex-wrap gap-2'>
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className='bg-blue-800 text-white px-3 py-2 rounded-full '
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
