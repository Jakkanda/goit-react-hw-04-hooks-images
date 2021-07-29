import React, { Component } from 'react';
import styled from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Pixabay from './services/Pixabay';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isModal: false,
    currentItem: {},
    isLoading: false,
  };

  formSubmit = data => {
    this.setState({ query: data.query });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      if (prevState.query !== this.state.query) {
        this.setState(prevState => ({ ...prevState, isLoading: true }));
        const response = await Pixabay.getImages(
          this.state.query,
          this.state.page,
        );

        this.setState(prevState => ({
          ...prevState,
          images: response,
          isLoading: false,
        }));
      }

      if (prevState.page !== this.state.page) {
        this.setState(prevState => ({ ...prevState, isLoading: true }));
        const response = await Pixabay.getImages(
          this.state.query,
          this.state.page,
        );

        this.setState(prevState => ({
          ...prevState,
          images: [...prevState.images, ...response],
          isLoading: false,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ ...prevState, page: ++prevState.page }));
  };

  onModalOpen = event => {
    const id = event.currentTarget.id;
    const currentItem = this.state.images.find(
      elem => elem.id === parseInt(id, 10),
    );
    this.setState(prevState => ({
      ...prevState,
      isModal: true,
      currentItem,
    }));
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.setState(prevState => ({
        ...prevState,
        isModal: false,
      }));
    }
  };

  closeModal = event => {
    if (event.currentTarget === event.target) {
      this.setState(prevState => ({
        ...prevState,
        isModal: false,
      }));
    }
  };

  render() {
    return (
      <div className={styled.App}>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery
          images={this.state.images}
          onModalOpen={this.onModalOpen}
        />
        {this.state.isModal && (
          <Modal item={this.state.currentItem} onClose={this.closeModal} />
        )}
        {this.state.images.length > 1 && <Button onClick={this.onLoadMore} />}
        {this.state.isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
      </div>
    );
  }
}

export default App;
