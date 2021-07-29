import React from 'react';
import styled from './Modal.module.css';

export function Modal({ item, onClose }) {
  return (
    <div className={styled.Overlay} onClick={onClose}>
      <div className={styled.Modal}>
        <img src={item.largeImageURL} alt="" />
      </div>
    </div>
  );
}
