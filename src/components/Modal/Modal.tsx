import React from 'react';
import classNames from 'classnames';

type SetSelectedPhotoId = (photo: number) => void;

type Props = {
  selectedPhotoId: number;
  photos: Photo[];
  setSelectedPhotoId: SetSelectedPhotoId;
};

export const Modal: React.FC<Props> = (props) => {
  const { selectedPhotoId, photos, setSelectedPhotoId } = props;
  const correctPhoto = photos.find(photo => photo.id === selectedPhotoId);

  return (
    <div className={classNames('modal', { 'is-active': selectedPhotoId })}>
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
                setSelectedPhotoId(0);
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
