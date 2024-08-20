import React from 'react';

import bookLuv2CodeImg from '../../../images/BooksImages/book-luv2code-1000.png';

const ReturnBook = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={bookLuv2CodeImg}
          alt="Book Luv2Code"
          width="151"
          height="233"
        />
        <h6 className="mt-2">Book</h6>
        <p>Luv2Code</p>
        <a href="#" className="btn main-color text-white">
          Reserve
        </a>
      </div>
    </div>
  );
};

export default ReturnBook;
