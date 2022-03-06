import React from 'react';
import classNames from 'classnames';

type SetSelectedPage = (page: number) => void;

type Props = {
  selectedPage: number;
  setSelectedPage: SetSelectedPage;
  pagesCount: number;
};

export const Pagination: React.FC<Props> = (props) => {
  const { pagesCount, selectedPage, setSelectedPage } = props;

  const setPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPage(+event.currentTarget.name);
  };

  const getPagesList = () => {
    const list = [];

    if (pagesCount <= 5) {
      for (let i = 1; i <= pagesCount; i += 1) {
        list.push(i);
      }
    } else if (selectedPage <= 3) {
      for (let i = 1; i <= 5; i += 1) {
        list.push(i);
      }
    } else if (selectedPage > 3 && pagesCount - selectedPage >= 2) {
      for (let i = selectedPage - 2; i <= selectedPage + 2; i += 1) {
        list.push(i);
      }
    } else {
      for (let i = pagesCount - 4; i <= pagesCount; i += 1) {
        list.push(i);
      }
    }

    return list;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center pb-2">
        <button
          type="button"
          className="btn btn-warning mx-4"
          onClick={() => {
            setSelectedPage(1);
          }}
        >
          First page
        </button>
        {getPagesList().map(page => (
          <li className={classNames('page-item', { active: selectedPage === page })} key={page}>
            <button
              type="button"
              className="page-link"
              name={String(page)}
              onClick={setPage}
            >
              {page}
            </button>
          </li>
        ))}
        <button
          type="button"
          className="btn btn-warning mx-4"
          onClick={() => {
            setSelectedPage(pagesCount);
          }}
        >
          Last page
          {` (${pagesCount})`}
        </button>
      </ul>
    </nav>
  );
};
