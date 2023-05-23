import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorPage } from './ErrorPage/ErrorPage';

import { Container } from './App.styled';
import { fetchImages } from 'services/fetch';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    gallery: [],
    totalHits: null,
    largeImage: '',
    tags: '',
    isLoading: false,
    isShowModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, gallery } = this.state;

    // console.log(prevState.searchQuery);
    if ((prevState.query !== query && query) || prevState.page !== page) {
      this.getImages();
    }
    if (gallery !== prevState.gallery && page > 1) {
      setTimeout(() => {
        window.scrollBy(0, window.innerHeight / 2);
      }, 250);
    }
  }
  getImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true, error: null });
    fetchImages(query, page)
      .then(data => {
        // console.log(data.hits);
        // console.log(data.totalHits);
        const hits = data.hits;
        const totalHits = data.totalHits;

        if (hits.length === 0) {
          this.notifyNoImages();
        }
        if (hits.length && page === 1) this.notifySuccess(totalHits);

        this.setState(prev => ({
          gallery: [...prev.gallery, ...hits],
          isLoading: false,
          totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearch = query => {
    if (!query) {
      this.notifyInputQuery();
    }
    this.setState({
      query,
      page: 1,
      gallery: [],
      totalHits: null,
      isLoading: false,
      error: null,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  hideModal = () => {
    this.setState({ isShowModal: false, largeImage: null, tags: null });
  };

  showModal = (url, alt) =>
    this.setState({ isShowModal: true, largeImage: url, tags: alt });

  notifyInputQuery = () => {
    toast('Please enter a search query!', {
      position: 'top-right',
      autoClose: 3000,
      style: { background: '#FF0000' },
    });
  };
  notifyNoImages = () => {
    toast('No images were found for your request.', {
      position: 'top-right',
      autoClose: 3000,
      style: { background: '	#FF8C00' },
    });
  };

  notifySuccess = total => {
    toast(`${total} images were found for your query`, {
      position: 'top-right',
      autoClose: 3000,
      style: { background: '	#32CD32' },
    });
  };

  render() {
    const {
      gallery,
      isLoading,
      largeImage,
      tags,
      isShowModal,
      totalHits,
      error,
    } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}

        {error && <ErrorPage text={` ${error}`} />}
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} showModal={this.showModal} />
        )}
        {gallery.length > 0 && !isLoading && gallery.length < totalHits && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isShowModal && (
          <Modal url={largeImage} alt={tags} hideModal={this.hideModal} />
        )}
        <Toaster />
      </Container>
    );
  }
}
