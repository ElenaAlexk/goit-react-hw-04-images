import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  //state = {
  //query: '',
  //};

  const handlNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please enter word for search');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <div>
      <header className={css.Searchbar}>
        <form className={css.Form} onSubmit={handleSubmit}>
          <button type="submit" className={css.Button}>
            <BiSearch size="25" />
          </button>
          <input
            className={css.Input}
            name="query"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handlNameChange}
          />
        </form>
      </header>
    </div>
  );
};
