import React from 'react';
import { Link } from 'react-router-dom';

import bookLuv2CodeDefaultImg from '../../../images/BooksImages/book-luv2code-1000.png';
import BookModel from '../../../models/BookModel';

const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  const { id: bookId, title, author, description, img: bookImg } = props.book;

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {bookImg ? (
              <img
                src={bookImg}
                alt={`${title} book by ${author}`}
                width="123"
                height="196"
              />
            ) : (
              <img
                src={bookLuv2CodeDefaultImg}
                alt="Book Luv2Code"
                width="123"
                height="196"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {bookImg ? (
              <img
                src={bookImg}
                alt={`${title} book by ${author}`}
                width="123"
                height="196"
              />
            ) : (
              <img
                src={bookLuv2CodeDefaultImg}
                alt="Book Luv2Code"
                width="123"
                height="196"
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{author}</h5>
            <h4>{title}</h4>
            <p className="card-text">{description}</p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            to={`/checkout/${bookId}`}
            className="btn btn-md main-color text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
