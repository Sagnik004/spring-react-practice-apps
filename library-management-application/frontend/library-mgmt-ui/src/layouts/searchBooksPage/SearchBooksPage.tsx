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
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelected, setCategorySelected] = useState('Book category');

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = 'http://localhost:8080/api/books';
      let url = '';
      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

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
  }, [currentPage, searchUrl]);

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

  const handleSearchChange = () => {
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search.trim()}&page=0&size=${booksPerPage}`
      );
    }
  };

  const handleCategoryChange = (value: string) => {
    if (
      value.toLowerCase() === 'fe' ||
      value.toLowerCase() === 'be' ||
      value.toLowerCase() === 'data' ||
      value.toLowerCase() === 'devops'
    ) {
      setCategorySelected(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`
      );
    } else {
      setCategorySelected('All');
      setSearchUrl(`?page=0&size=${booksPerPage}`);
    }
  };

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
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={handleSearchChange}
                >
                  Search
                </button>
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
                  {categorySelected}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => handleCategoryChange('All')}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => handleCategoryChange('FE')}>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li onClick={() => handleCategoryChange('BE')}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li onClick={() => handleCategoryChange('Data')}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={() => handleCategoryChange('DevOps')}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Search results overview */}
          {totalCountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalCountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalCountOfBooks}{' '}
                items
              </p>

              {/* Render books */}
              {books.map((book) => (
                <SearchBook key={book.id} book={book} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                href="#"
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
              >
                Library Services
              </a>
            </div>
          )}

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
