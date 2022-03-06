import React from 'react';
import classNames from 'classnames';

type SetSelectedPhoto = (photo: number) => void;

type Props = {
  selectedPhoto: number;
  photos: Photo[];
  setSelectedPhoto: SetSelectedPhoto;
};

export const Modal: React.FC<Props> = (props) => {
  const { selectedPhoto, photos, setSelectedPhoto } = props;
  const correctPhoto = photos.find(photo => photo.id === selectedPhoto);

  return (
    <div className={classNames('modal', { 'is-active': selectedPhoto })}>
      <div className="modal-background" />
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{correctPhoto && correctPhoto.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setSelectedPhoto(0);
              }}
            />
          </div>
          <div className="modal-body">
            {correctPhoto && <img src={correctPhoto.url} alt={correctPhoto.title} />}
          </div>
        </div>
      </div>
    </div>
  );
};
