/**Display product rating with stars
 * @param {number} props.max The maximum rating. (Usually 5).
 * @param {number} props.rating The current rating score. This value will be passed to Math.round before display.
 */
const RatingStars = (props)=> {
  let {max, rating} = props;
  rating = Math.round(rating);

  let stars = [];

  for (let i = 1; i <= max; i++) {
    stars.push(
      <i className={`fa fa-star${rating >= i ? '' : '-o'}`}></i>
    );
  }

  return stars;
}

export default RatingStars;
