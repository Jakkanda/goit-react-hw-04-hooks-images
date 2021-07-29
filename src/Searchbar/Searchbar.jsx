import React, { Component } from 'react';
import styled from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({
      query: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styled.Searchbar}>
        <form className={styled.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styled['SearchForm-button']}>
            <span className={styled['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={styled['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
