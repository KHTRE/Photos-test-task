import React from 'react';
import { deletePhotoFromServer } from '../../api/photos';

type SetPhotos = (photos: Photo[]) => void;
type SetPagesCount = (count: number) => void;
type SetSelectedPhoto = (photo: number) => void;

type Props = {
  photos: Photo[];
  setPhotos: SetPhotos;
  selectedAlbum: number;
  setPagesCount: SetPagesCount;
  selectedPage: number;
  setSelectedPhoto: SetSelectedPhoto;
};

export const ListOfPhotos: React.FC<Props> = (props) => {
  const {
    photos,
    setPhotos,
    selectedAlbum,
    setPagesCount,
    selectedPage,
    setSelectedPhoto,
  } = props;

  const getFilteredPhotos = () => {
    let filteredPhotos = photos;

    if (selectedAlbum !== 0) {
      filteredPhotos = photos.filter(photo => photo.albumId === selectedAlbum);
    }

    const pagesCount = Math.ceil(filteredPhotos.length / 10);

    setPagesCount(pagesCount);

    return filteredPhotos;
  };

  const getPhotosToShow = () => {
    return getFilteredPhotos().filter((_photo, index) => (
      index >= selectedPage * 10 - 10 && index < selectedPage * 10
    ));
  };

  const handlePhotoSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPhoto(+event.currentTarget.name);
  };

  const handlePhotoDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deletePhotoFromServer(+event.currentTarget.name);
    const photosCopy = [...photos];
    const delIndex = photosCopy.findIndex(photo => photo.id === +event.currentTarget.name);

    photosCopy.splice(delIndex, 1);
    setPhotos(photosCopy);
  };

  return (
    <div className="px-4 row row-cols-1 row-cols-md-5 row-cols-sm-3 g-4">
      {getPhotosToShow().map(photo => (
        <div className="col">
          <div className="card h-100">
            <button
              type="button"
              onClick={handlePhotoSelect}
              name={String(photo.id)}
              className="btn btn-outline-secondary"
            >
              <img
                src={photo.thumbnailUrl}
                className="card-img-top"
                alt={photo.title}
              />
            </button>
            <div className="card-body">
              <h5 className="card-title">{photo.title}</h5>
            </div>
            <button type="button" className="button is-danger" onClick={handlePhotoDelete} name={String(photo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
