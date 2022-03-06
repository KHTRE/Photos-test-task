import React from 'react';

type SetSelectedAlbum = (selectedAlbum:number) => void;
type SetSelectedPage = (selectedPage:number) => void;

type Props = {
  albums: number[];
  selectedAlbum: number;
  setSelectedAlbum: SetSelectedAlbum;
  setSelectedPage: SetSelectedPage;
};

export const Header: React.FC<Props> = (props) => {
  const {
    albums,
    selectedAlbum,
    setSelectedAlbum,
    setSelectedPage,
  } = props;

  const handleAlbumSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value !== selectedAlbum) {
      setSelectedAlbum(+event.target.value);
      setSelectedPage(1);
    }
  };

  return (
    <header className="d-flex justify-content-center py-4">
      <label htmlFor="select">
        Select desired album: &nbsp;
        <select
          id="select"
          value={selectedAlbum}
          onChange={handleAlbumSelect}
        >
          <option value="0">All albums</option>
          {albums.map(album => (
            <option key={album} value={album}>{album}</option>
          ))}
        </select>
      </label>
    </header>
  );
};
