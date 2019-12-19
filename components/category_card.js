import Link from 'next/link';

import './styles/product_card.scss';

const CategoryCard = (props)=> {
  const {category} = props;
  const {slug, id, image, name, count} = category;

  return (<div className="category-card">
    <Link href="categories/[id]" as={`categories/${slug}_${id}`}>
      <a className="category-card__thumbnail">
        <img src={image ? image.src : ''}
          alt={image && image.alt ? image.alt : `Image showing ${name}`}
        />
      </a>
    </Link><br />

    <Link href="categories/[id]" as={`categories/${slug}_${id}`}>
      <a className="category-card__name">
        {name}
      </a>
    </Link><br />

    <span className="category-card__count">
      {count} products listed.
    </span><br />

    <button className="category-card__action">
      Browse
    </button><br />
  </div>);
};

export default CategoryCard;
