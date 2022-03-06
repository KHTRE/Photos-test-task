import React from 'react';

export const Loader: React.FC = () => (
  <div className="modal-background bg-light">
    <div className="position-absolute top-50 start-50">

      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);
