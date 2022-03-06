import React, { useEffect, useState } from 'react';
import { ListOfPhotos } from './components/ListOfPhotos';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { Modal } from './components/Modal';
import { Loader } from './components/Loader';
import { getPhotosFromServer } from './api/photos';

export const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<number[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

  const getPhotos = async () => {
    setLoading(true);
    const photosFromServer:Photo[] = await getPhotosFromServer();
    const listOfAlbums = photosFromServer.map(photo => photo.albumId);
    const finalListOfAlbums = Array.from(new Set(listOfAlbums));

    setPhotos(photosFromServer);
    setAlbums(finalListOfAlbums);
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      <Modal
        selectedPhoto={selectedPhoto}
        photos={photos}
        setSelectedPhoto={setSelectedPhoto}
      />
      <Header
        albums={albums}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        setSelectedPage={setSelectedPage}
      />
      <ListOfPhotos
        photos={photos}
        setPhotos={setPhotos}
        selectedAlbum={selectedAlbum}
        setPagesCount={setPagesCount}
        selectedPage={selectedPage}
        setSelectedPhoto={setSelectedPhoto}
      />
      <Pagination
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        pagesCount={pagesCount}
      />
      {loading && <Loader />}
    </div>
  );
};
