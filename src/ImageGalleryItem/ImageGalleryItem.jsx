import React from 'react';
import styled from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ item, onModalOpen }) {
  return (
    <li className={styled.ImageGalleryItem} id={item.id} onClick={onModalOpen}>
      <img src={item.webformatURL} alt="" className={styled['ImageGalleryItem-image']} />
    </li>
  );
}
