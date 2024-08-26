import { useState, useEffect } from 'react';

import BookModel from '../../models/BookModel';
import LoadingSpinner from '../utils/LoadingSpinner';
import SearchBook from './components/SearchBook';
import Pagination from '../utils/Pagination';

type ResponseBooksMetadata = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalCountOfBooks, setTotalCountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = 'http://localhost:8080/api/books';
      const url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const responseJson = await res.json();
      const responseData = responseJson._embedded.books;
      const responseBooksMetadata: ResponseBooksMetadata = responseJson.page;

      const loadedBooks: BookModel[] = [];
      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setTotalCountOfBooks(responseBooksMetadata.totalElements);
      setTotalPages(responseBooksMetadata.totalPages);

      setBooks(loadedBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((err: any) => {
      setIsLoading(false);
      setHttpError(err.message);
    });

    scrollToTop();
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalCountOfBooks
      ? booksPerPage * currentPage
      : totalCountOfBooks;

  return (
    <div>
      <div className="container">
        <div>
          {/* Search Bar and Filter */}
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary drowdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Search results overview */}
          <div className="mt-3">
            <h5>Number of results: ({totalCountOfBooks})</h5>
          </div>
          <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalCountOfBooks} items
          </p>

          {/* Render books */}
          {books.map((book) => (
            <SearchBook key={book.id} book={book} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
