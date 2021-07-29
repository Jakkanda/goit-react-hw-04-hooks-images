import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styled from './ImageGallery.module.css';

export function ImageGallery({ images, onModalOpen }) {
  return (
    <ul className={styled.ImageGallery}>
      {images.map(item => (
        <ImageGalleryItem item={item} onModalOpen={onModalOpen} key={item.id} />
      ))}
    </ul>
  );
}
