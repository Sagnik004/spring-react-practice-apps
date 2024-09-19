import React from 'react';

import ReviewModel from '../../models/ReviewModel';
import StarsReview from './StarsReview';

const Review: React.FC<{ review: ReviewModel }> = (props) => {
  const {
    date: propsDate,
    userEmail,
    rating,
    reviewDescription,
  } = props.review;

  const date = new Date(propsDate);
  const longMonth = date.toLocaleString('en-us', { month: 'long' });
  const dateDay = date.getDay();
  const dateYear = date.getFullYear();
  const dateRender = `${longMonth} ${dateDay}, ${dateYear}`;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{userEmail}</h5>

        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview rating={rating} size={16} />
          </div>
        </div>

        <div className="mt-2">
          <p>{reviewDescription}</p>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Review;
