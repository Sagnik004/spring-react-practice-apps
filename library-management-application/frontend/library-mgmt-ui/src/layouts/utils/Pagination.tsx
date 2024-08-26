import { FC, ReactElement } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (a: number) => void;
};

const Pagination: FC<PaginationProps> = (props): ReactElement => {
  const { currentPage, totalPages, paginate } = props;

  const pageNumbers = [];

  if (currentPage === 1) {
    pageNumbers.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumbers.push(currentPage - 2);
      pageNumbers.push(currentPage - 1);
    } else {
      pageNumbers.push(currentPage - 1);
    }

    pageNumbers.push(currentPage);

    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => paginate(1)}>
          <button className="page-link">First Page</button>
        </li>
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            onClick={() => paginate(pageNum)}
            className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
          >
            <button className="page-link">{pageNum}</button>
          </li>
        ))}
        <li className="page-item" onClick={() => paginate(totalPages)}>
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
