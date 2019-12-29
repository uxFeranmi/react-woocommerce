import './styles/rating_stars.scss';

/**Display product rating with stars
 * @param {number} props.max The maximum rating. (Usually 5).
 * @param {number} props.rating The current rating score. This value will be passed to Math.round before display.
 * @param {number} props.context Optional. One of 'view' or 'input'. If 'input', 
 * an onClick prop must be passed to capture the number of stars chosen by the user.
 * @param {function} props.onClick (event, index) Optional. Click event handler to capture number of stars selected by user.
 */
const RatingStars = (props)=> {
  let {max, rating} = props;
  rating = Math.round(rating);

  const context = props.context || 'view';

  let stars = [];

  for (let index = 1; index <= max; index++) {
    const star = (
      <i className={`fa fa-star${rating >= index ? '' : '-o'}`}
        key={index}
      ></i>
    );

    switch (context) {
      case 'view':
        stars.push(star);
        break;
      case 'input':
        stars.push(
          <button onClick={(event)=> props.onClick(event, index)}
            key={index}
            aria-label={`${index} star`} type="button"
          >
            {star}
          </button>
        );
        break;
    }
  }

  return <div className={props.className}>{stars}</div>;
}

export default RatingStars;
