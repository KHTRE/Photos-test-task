import React from 'react';
import { deletePhotoFromServer } from '../../api/photos';

type SetPhotos = (photos: Photo[]) => void;
type SetSelectedPhotoId = (photo: number) => void;
type SetFilteredPhotos = (photo: Photo[]) => void;

type Props = {
  photos: Photo[];
  filteredPhotos: Photo[];
  setFilteredPhotos: SetFilteredPhotos;
  setPhotos: SetPhotos;
  selectedPage: number;
  itemsPerPage: number;
  setSelectedPhotoId: SetSelectedPhotoId;
};

export const ListOfPhotos: React.FC<Props> = (props) => {
  const {
    photos,
    filteredPhotos,
    setPhotos,
    setFilteredPhotos,
    selectedPage,
    setSelectedPhotoId,
    itemsPerPage,
  } = props;

  const getPhotosToShow = () => {
    if (filteredPhotos.length > 0) {
      return filteredPhotos.filter((_photo, index) => (
        index >= selectedPage * itemsPerPage - itemsPerPage && index < selectedPage * itemsPerPage
      ));
    }

    return photos.filter((_photo, index) => (
      index >= selectedPage * itemsPerPage - itemsPerPage && index < selectedPage * itemsPerPage
    ));
  };

  const handlePhotoSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPhotoId(+event.currentTarget.name);
  };

  const handlePhotoDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deletePhotoFromServer(+event.currentTarget.name);

    const newPhotos = photos.filter(photo => photo.id !== +event.currentTarget.name);

    const newFilterPhotos = filteredPhotos.filter(photo => photo.id !== +event.currentTarget.name);

    setPhotos(newPhotos);
    setFilteredPhotos(newFilterPhotos);
  };

  return (
    <div className="px-4 pb-4 row row-cols-1 row-cols-md-5 row-cols-sm-3 g-4">
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
              <span>
                <b>Album: </b>
                {photo.albumId}
              </span>
              <h5 className="card-title text-truncate" title={photo.title}>
                <b>Title: </b>
                {photo.title}
              </h5>
            </div>
            <button type="button" className="button is-danger" onClick={handlePhotoDelete} name={String(photo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
