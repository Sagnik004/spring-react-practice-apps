import React from 'react';
import { Link } from 'react-router-dom';

import ReviewModel from '../../models/ReviewModel';
import Review from '../utils/Review';

type LatestReviewsProps = {
  reviews: ReviewModel[];
  bookId: number | undefined;
  isMobile: boolean;
};

const LatestReviews: React.FC<LatestReviewsProps> = (props) => {
  const { reviews, bookId, isMobile } = props;

  return (
    <div className={isMobile ? 'mt-3 mb-2' : 'row mt-5 mb-3'}>
      <div className={isMobile ? '' : 'col-sm-2 col-md-2'}>
        <h2>Latest Reviews</h2>
      </div>
      <div className="col-sm-10 col-md-10">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <Review key={review.id} review={review} />
            ))}
            <div className="m-3">
              <Link
                to="#"
                type="button"
                className="btn main-color btn-md text-white"
              >
                Read all reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p>Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviews;
