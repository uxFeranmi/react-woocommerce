import './styles/user_review.scss';
import getTimeDiff from '../services/time_difference';
import RatingStars from '../components/rating_stars';

const stripHtmlTags = (html)=> {
  const element = document.createElement('div');

  element.innerHTML = html;

  return element.innerText; //Value is same as textContent because element is detached from DOM.
}

const UserReview = props => {
  const {
    date_created_gmt: dateString,
    status,
    reviewer,
    reviewer_avatar_urls: avatarUrls,
    review: reviewHtml,
    rating,
    verified } = props.review;
  //

  const date = new Date(dateString);

  const reviewText = stripHtmlTags(reviewHtml);

  return (
    <article className="user-review">
      <img src={avatarUrls['48']}
        className="user-review__avatar"
        alt={`${reviewer}'s avatar`}
      />

      <div>
        <address className="user-review__author-name">
          {reviewer}
        </address>
        <time className="user-review__date-created">
          {getTimeDiff(date)} ago
        </time>
        <span className="user-review__stars">
          <RatingStars max={5} rating={rating} />
        </span>

        {!verified ? (
          <strong className="user-review__unverified-notice">
            <em>
              This reviewer has not purchased this product
              from IT Supplies<small>.co</small>
            </em>
          </strong>
        ) : ''}

        <p className="user-review__comment">
          {reviewText}
        </p>
      </div>
    </article>
  );
};

export default UserReview;