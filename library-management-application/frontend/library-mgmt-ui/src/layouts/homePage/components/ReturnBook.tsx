import React from 'react';

import bookLuv2CodeDefaultImg from '../../../images/BooksImages/book-luv2code-1000.png';
import BookModel from '../../../models/BookModel';

const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  const { title, author, img: bookImg } = props.book;

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {bookImg ? (
          <img src={bookImg} alt="Book Luv2Code" width="151" height="233" />
        ) : (
          <img
            src={bookLuv2CodeDefaultImg}
            alt="Book Luv2Code"
            width="151"
            height="233"
          />
        )}
        <h6 className="mt-2">{title}</h6>
        <p>{author}</p>
        <a href="#" className="btn main-color text-white">
          Reserve
        </a>
      </div>
    </div>
  );
};

export default ReturnBook;
