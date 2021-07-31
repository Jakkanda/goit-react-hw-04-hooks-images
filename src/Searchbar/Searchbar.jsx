import { useState} from 'react';
import styled from './Searchbar.module.css';

export function Searchbar ({onSubmit}) {
  const [query, setQuery] = useState('');


  const handleInputChange = e => {
    setQuery( e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({query});
    setQuery('');
  };

    return (
      <header className={styled.Searchbar}>
        <form className={styled.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styled['SearchForm-button']}>
            <span className={styled['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={styled['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
