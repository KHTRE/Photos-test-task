import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ListOfPhotos } from './components/ListOfPhotos';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { Modal } from './components/Modal';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { getPhotosFromServer } from './api/photos';

export const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<number[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number>(0);

  const getPhotos = async () => {
    setLoading(true);
    let photosFromServer: Photo[] = [];

    try {
      photosFromServer = await getPhotosFromServer();
    } catch {
      setError(true);
    }

    const listOfAlbums = photosFromServer.map(photo => photo.albumId);
    const finalListOfAlbums = Array.from(new Set(listOfAlbums));

    setPagesCount(Math.ceil(photosFromServer.length / itemsPerPage));
    setPhotos(photosFromServer);
    setAlbums(finalListOfAlbums);
    setLoading(false);
  };

  const getPagesCount = (preparedPhotos: Photo[]) => {
    const numberOfPages = Math.ceil(preparedPhotos.length / itemsPerPage);

    setPagesCount(numberOfPages);
  };

  const getFilteredPhotos = () => {
    let photosByAlbum = photos;

    if (selectedAlbum !== 0) {
      photosByAlbum = photos.filter(photo => photo.albumId === selectedAlbum);
    }

    getPagesCount(photosByAlbum);
    setFilteredPhotos(photosByAlbum);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    getFilteredPhotos();
  }, [selectedAlbum]);

  useEffect(() => {
    getPagesCount(filteredPhotos);
  }, [itemsPerPage, filteredPhotos]);

  return (
    <div>
      <Modal
        selectedPhotoId={selectedPhotoId}
        photos={photos}
        setSelectedPhotoId={setSelectedPhotoId}
      />
      <div
        className={
          classNames(
            'sticky-top bg-light border-bottom mb-2',
            { 'visually-hidden': selectedPhotoId },
          )
        }
      >
        <Header
          albums={albums}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
          setSelectedPage={setSelectedPage}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pagesCount={pagesCount}
        />
      </div>
      <ListOfPhotos
        photos={photos}
        filteredPhotos={filteredPhotos}
        setFilteredPhotos={setFilteredPhotos}
        setPhotos={setPhotos}
        selectedPage={selectedPage}
        setSelectedPhotoId={setSelectedPhotoId}
        itemsPerPage={itemsPerPage}
      />
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
};
