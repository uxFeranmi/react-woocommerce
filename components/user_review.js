import './styles/user_review.scss';

const stripHtmlTags = (html)=> {
  const element = document.createElement('div');

  element.innerHTML = html;

  return element.innerText; //Value is same as textContent because element is detached from DOM.
}

const UserReview = props => {
  const { 
    date_created,
    date_created_gmt: dateString,
    status,
    reviewer,
    reviewer_avatar_urls: avatarUrls,
    review: reviewHtml,
    rating,
    verified } = props.review;
  //

  const date = Date.parse(dateString);

  const reviewText = stripHtmlTags(reviewHtml);

  return (
    <article className="user-review">
      <img src={avatarUrls['48']}
        className="user-review__avatar"
        alt={`${reviewer}'s avatar`}
      />

      <div>
        <strong>{reviewer}</strong>
        <small> • {date}</small>
        <p>{reviewText}</p>
      </div>
    </article>
  );
};

export default UserReview;