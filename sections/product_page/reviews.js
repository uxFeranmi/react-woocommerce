import { useState } from 'react';

import UserReview from '../../components/user_review';
import RatingStars from '../../components/rating_stars';

import './styles/reviews.scss';

const submitReviewForm = (formData)=> {
  console.log(formData);
};

const ProductReviews = (props)=> {
  const {reviews, gotReviews} = props;

  const {
    average_rating: avgRating,
    rating_count: ratingCount,
    total_sales: totalSales,
  } = props.product;

  let [reviewFormData, setReviewFormData] = useState({
    stars: 0,
    comment: '',
    name: '',
    email: '',
  });

  const onRatingStarClick = (event, index)=> { 
    event.preventDefault();
    setReviewFormData({
      ...reviewFormData,
      stars: index,
    });
  }

  return (
    <div className={`${props.className} product-reviews`}>
      <div className="product-reviews__overall-rating product-rating">
        <strong className="product-rating__main">
          Overall rating:
          <RatingStars max={5} rating={avgRating}
            className="product-rating__stars"
          />
          {avgRating}
        </strong>

        <span className="product-rating__review-count">
          Based on {ratingCount} review{`${ratingCount > 1 ? 's' : ''}`}
        </span>

        {
          totalSales > 1 ? 
            <small className="product-rating__units-sold">
              {totalSales} units sold
            </small>
          : ''
        }
      </div>

      <div className="product-reviews__submit-rating rating-form">
        <h3 className="rating-form__heading">
          <small>Bought this product recently?</small>
          <br />
          Submit your review.
        </h3>

        <form className="rating-form__form">
          <label>
            Rate this product:
            
            <RatingStars className="rating-form__star-input"
              rating={reviewFormData.stars}
              max={5} context="input"
              onClick={onRatingStarClick}
            />
          </label>
          
          <label>
            Leave a comment:
            <textarea className="rating-form__comment-input"
              placeholder="A great product. I would recommend this."
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                comment: e.target.value,
              })}
            ></textarea>
          </label>

          <label>
            Name: &nbsp;
            <input placeholder="John Doe"
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                name: e.target.value,
              })}
            />
          </label>

          <label>
            eMail: &nbsp;
            <input placeholder="john@example.com"
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                email: e.target.value,
              })}
            />
          </label>

          <button type="submit"
            className="rating-form__submit"
            onClick={(e)=> {
              e.preventDefault;
              submitReviewForm(reviewFormData);
            }}
          >
            Submit Review
          </button>
        </form>
      </div> 

      <hr className="product-reviews__divider" />

      <div className="product-reviews__customer-reviews">
        {reviews.length > 0 ? (
          <ul aria-label="Customer Reviews"
            title="Customer Reviews"
          >
            {reviews.map((review)=> (
              <li key={review.id}>
                <UserReview review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="product-reviews__no-reviews-notice">
            {!gotReviews ? 
              'Failed to fetch product reviews.'
              : 'There are no reviews yet.'
            }
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
