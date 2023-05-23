import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorPage } from './ErrorPage/ErrorPage';

import { Container } from './App.styled';
import { fetchImages } from 'services/fetch';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [error, setError] = useState(null);

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page, gallery } = this.state;

  //   // console.log(prevState.searchQuery);
  //   if ((prevState.query !== query && query) || prevState.page !== page) {
  //     this.getImages();
  //   }
  //   if (gallery !== prevState.gallery && page > 1) {
  //     setTimeout(() => {
  //       window.scrollBy(0, window.innerHeight / 2);
  //     }, 250);
  //   }
  // }

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);

      fetchImages(query, page)
        .then(data => {
          // console.log(data.hits);
          // console.log(data.totalHits);
          const hits = data.hits;
          const totalHits = data.totalHits;

          if (hits.length === 0) {
            notifyNoImages();
          }
          if (hits.length && page === 1) notifySuccess(totalHits);

          setGallery(prevGallery => [...prevGallery, ...hits]);
          setIsLoading(false);
          setTotalHits(totalHits);
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [page, query]);

  const handleSearch = query => {
    if (!query) {
      notifyInputQuery();
    }
    setQuery(query);
    setPage(1);
    setGallery([]);
    setTotalHits(null);
    setIsLoading(false);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const hideModal = () => {
    setIsShowModal(false);
    setLargeImage(null);
    setTags(null);
  };

  const showModal = (url, alt) => {
    setIsShowModal(true);
    setLargeImage(url);
    setTags(alt);
  };

  const notifyInputQuery = () => {
    toast('Please enter a search query!', {
      style: { background: '#FF0000' },
    });
  };
  const notifyNoImages = () => {
    toast('No images were found for your request.', {
      style: { background: '	#FF8C00' },
    });
  };

  const notifySuccess = total => {
    toast(`${total} images were found for your query`, {
      style: { background: '	#32CD32' },
    });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      {isLoading && <Loader />}

      {error && <ErrorPage text={` ${error}`} />}
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} showModal={showModal} />
      )}
      {gallery.length > 0 && !isLoading && gallery.length < totalHits && (
        <Button onClick={handleLoadMore} />
      )}
      {isShowModal && (
        <Modal url={largeImage} alt={tags} hideModal={hideModal} />
      )}
      <Toaster
        position="top-right"
        toastOptions={{ className: '', duration: 3000 }}
      />
    </Container>
  );
};
