import React from 'react';
import styled from './Button.module.css';

export function Button({ onClick }) {
  return (
    <button type="button" className={styled.Button} onClick={onClick}>
      Load more
    </button>
  );
}
