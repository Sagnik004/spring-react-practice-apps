import { useEffect, useState } from 'react';

import BookModel from '../../models/BookModel';
import ReviewModel from '../../models/ReviewModel';
import LoadingSpinner from '../utils/LoadingSpinner';
import StarsReview from '../utils/StarsReview';
import LatestReviews from './LatestReviews';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';
import bookLuv2CodeDefaultImg from '../../images/BooksImages/book-luv2code-1000.png';

const BookCheckoutPage = () => {
  // Book related state
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review related state
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

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

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const reviewResponse = await fetch(reviewUrl);
      if (!reviewResponse.ok) {
        throw new Error('Something went wrong!');
      }
      const reviewJsonResponse = await reviewResponse.json();
      const reviewData = reviewJsonResponse._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];
      let weightedStarReviews = 0;
      for (const key in reviewData) {
        loadedReviews.push({
          id: reviewData[key].id,
          userEmail: reviewData[key].userEmail,
          date: reviewData[key].date,
          rating: reviewData[key].rating,
          book_id: reviewData[key].bookId,
          reviewDescription: reviewData[key].reviewDescription,
        });
        weightedStarReviews += reviewData[key].rating;
      }

      if (loadedReviews) {
        const roundedStarReview = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(+roundedStarReview);
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((err: any) => {
      setIsLoadingReview(false);
      setHttpError(err.message);
    });
  }, [bookId]);

  if (isLoading || isLoadingReview) {
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
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} isMobile={false} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} isMobile={false} />
      </div>

      {/* Mobile */}
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
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} isMobile={true} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} isMobile={true} />
      </div>
    </div>
  );
};

export default BookCheckoutPage;
