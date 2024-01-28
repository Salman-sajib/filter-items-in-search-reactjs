/* eslint-disable react/jsx-key */
import { useRef, useState } from 'react';

export default function App() {
  const [items, setItems] = useState(['an item']);
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === '') return;
    setItems((prev) => {
      return [...prev, value];
    });
    inputRef.current.value = '';
  }

  return (
    <div>
      Searct:
      <input type='search' />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type='text' />
        <button type='submit'>Add</button>
      </form>
      <h3>Items:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
