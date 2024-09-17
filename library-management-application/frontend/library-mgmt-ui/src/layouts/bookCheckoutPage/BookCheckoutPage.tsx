import { useEffect, useState } from 'react';

import BookModel from '../../models/BookModel';
import LoadingSpinner from '../utils/LoadingSpinner';
import StarsReview from '../utils/StarsReview';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';
import bookLuv2CodeDefaultImg from '../../images/BooksImages/book-luv2code-1000.png';

const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const bookId = window.location.pathname.split('/')[2]; // localhost:3000/checkout/2

  useEffect(() => {
    const fetchBook = async () => {
      const url = `http://localhost:8080/api/books/${bookId}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await res.json();

      const loadedBook: BookModel = {
        id: responseData.id,
        title: responseData.title,
        author: responseData.author,
        description: responseData.description,
        copies: responseData.copies,
        copiesAvailable: responseData.copiesAvailable,
        category: responseData.category,
        img: responseData.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };

    fetchBook().catch((err: any) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, [bookId]);

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

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book.img} width="226" height="349" alt="Book" />
            ) : (
              <img
                src={bookLuv2CodeDefaultImg}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p>{book?.description}</p>
              <StarsReview rating={3.5} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} isMobile={false} />
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book.img} width="226" height="349" alt="Book" />
          ) : (
            <img
              src={bookLuv2CodeDefaultImg}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p>{book?.description}</p>
            <StarsReview rating={3.5} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} isMobile={true} />
        <hr />
      </div>
    </div>
  );
};

export default BookCheckoutPage;
