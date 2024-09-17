import React from 'react';
import { Link } from 'react-router-dom';

import BookModel from '../../models/BookModel';

type CheckoutAndReviewBoxProps = {
  book: BookModel | undefined;
  isMobile: boolean;
};

const CheckoutAndReviewBox: React.FC<CheckoutAndReviewBoxProps> = (props) => {
  const { book, isMobile } = props;

  return (
    <div
      className={
        isMobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <strong>0/5</strong> books checked out
          </p>
          <hr />
          {book && book.copiesAvailable && book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6">
              <strong>{book?.copies}</strong> copies
            </p>
            <p className="col-6">
              <strong>{book?.copiesAvailable}</strong> available
            </p>
          </div>
        </div>
        <Link to="/#" className="btn btn-success btn-lg">
          Sign in
        </Link>
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review.</p>
      </div>
    </div>
  );
};

export default CheckoutAndReviewBox;
