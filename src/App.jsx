/* eslint-disable react/jsx-key */
import { useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [items, setItems] = useState([]);
  const inputRef = useRef();

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
    <div className='bg-teal-100 min-h-dvh flex flex-col gap-2 items-center justify-center'>
      <div>
        <label htmlFor='search'>Searct:</label>{' '}
        <input type='search' id='search' />
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='input'>New Item:</label>{' '}
          <input ref={inputRef} id='input' type='text' />
        </div>
        <button type='submit'>Add</button>
      </form>

      <h3>Items:</h3>

      {items.length === 0 ? (
        <p>There is no item in your list, Please add some item.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
