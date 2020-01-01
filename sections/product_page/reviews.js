import { useState } from 'react';

import wooApi from '../../services/woo_api';

import UserReview from '../../components/user_review';
import RatingStars from '../../components/rating_stars';
import Notice from '../../components/notify';

import './styles/reviews.scss';

const ProductReviews = (props)=> {
  const {
    reviews,
    renderNewReview,
    gotReviews,
    product: {
      id: productId,
      average_rating: avgRating,
      rating_count: ratingCount,
      total_sales: totalSales,
    },
  } = props;

  let [reviewFormData, setReviewFormData] = useState({
    productId,
    stars: 0,
    comment: '',
    name: '',
    email: '',
  });

  let [formError, setFormError] = useState({
    global: [],
    ratingStars: [],
  });

  const onRatingStarClick = (event, index)=> { 
    event.preventDefault();
    setReviewFormData({
      ...reviewFormData,
      stars: index,
    });
  }
  
  const notify = (scope, type, content, action = null)=> {
    let newFormError = {...formError};
    let newErrorIndex = formError[scope].length;

    newFormError[scope].push({
      type,
      content,
      action,
      dismiss: ()=> {
        let newFormError = {...formError};
        delete newFormError[scope][newErrorIndex];
        setFormError(newFormError);
      },
    });

    setFormError(newFormError);
  }

  const submitReviewForm = (event, formData)=> {
    event.preventDefault ?
      event.preventDefault()
    : event.returnValue = false;

    //checkValidity()
    if (!formData.stars) {
      let errorMessage = 'Please provide a star rating. 5 stars would be nice 😊.';
      notify('ratingStars', 'error', errorMessage);
      
      return false;
    };
  
    const data = {
      product_id: formData.productId,
      review: formData.comment,
      reviewer: formData.name,
      reviewer_email: formData.email,
      rating: formData.stars,
    };
    
    wooApi.post("products/reviews", data)
      .then((response) => {
        renderNewReview(response.data);
      })
      .catch((error) => {
        let errorMessage = error.response ?
          JSON.stringify(error.response) //error.response.data.message
        : error.message;

        notify('global', 'error', errorMessage);
      });
    //
    
    return false;
  };

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

      <hr className="product-reviews__divider is-first" />

      <div className="product-reviews__submit-rating rating-form">
        <h3 className="rating-form__heading">
          <small>Bought this product recently?</small>
          <br />
          Submit your review.
        </h3>

        <form className="rating-form__form"
          title="Submit your review"
          aria-live="polite"
          onSubmit={(e)=> submitReviewForm(e, reviewFormData)}
        >
          <Notice messages={formError.global} />

          <label>
            Rate this product:
            <Notice messages={formError.ratingStars} />
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
              required minLength={2} maxLength={500}
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                comment: e.target.value,
              })}
            ></textarea>
          </label>

          <label>
            Name: &nbsp;
            <input type="text" //required
              minLength={2} maxLength={70}
              placeholder="John Doe"
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                name: e.target.value,
              })}
            />
          </label>

          <label>
            eMail: &nbsp;
            <input type="email" required
              placeholder="john@example.com"
              onChange={(e)=> setReviewFormData({
                ...reviewFormData,
                email: e.target.value,
              })}
            />
          </label>

          <button type="submit" className="rating-form__submit">
            Submit Review
          </button>
        </form>
      </div> 

      <hr className="product-reviews__divider is-second" />

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
