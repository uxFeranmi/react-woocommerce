//import { useRouter } from 'next/router';
// import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import Layout from '../../components/my_layout';
import wooApi from '../../services/woo_api';
import getCategoryTree from '../../services/category_tree';
//import wpApi from '../../services/wp_api';

//import Subcategories from '../../sections/category_page/subcategories';
import ProductCard from '../../components/product_card';
import UserReview from '../../components/user_review';
import RatingStars from '../../components/rating_stars';

import './styles/[slug_id].scss';

const submitReviewForm = (formData)=> {
  console.log(formData);
};

export default function ProductPage(props) {
  if (props.error) return JSON.stringify(props.error);

  let [tab, switchTab] = useState('description');

  let [reviews, setReviews] = useState([]);
  let [gotReviews, setGotReviews] = useState(false);

  let [reviewFormData, setReviewFormData] = useState({
    stars: 0,
    comment: '',
    name: '',
    email: '',
  });

  const {
    categoryTree,
    product: {
      categories,
      images,
      name,
      short_description: shortDesc,
      description,
      average_rating: avgRating,
      rating_count: ratingCount,
      total_sales: totalSales,
    },
    relatedProducts,
  } = props;
  
  useEffect(()=> {
    if (!gotReviews) {
      wooApi.get("products/reviews", { product: [props.id] })
        .then((response) => {
          setReviews(response.data);
          setGotReviews(true);
        })
        .catch((error) => {
          if (error.response)
            console.error(error.response.data);

          console.error(error);
        });
    }
  });

  return (
    <Layout categories={categoryTree}>
      <section className="main-details">
        <div className="main-details__text-content">
          <h1>{name}</h1>

          <div className="main-details__short-description"
            dangerouslySetInnerHTML={{ __html: shortDesc }}
          ></div>

          <div className="main-details__action">
            <label>Quantity:
              <input type="number" defaultValue="1" />
            </label>

            <button>Buy Now</button>
          </div>
        </div>

        <div className="main-details__product-image-wrapper">
          <div className="main-details__categories">
            {categories.map((category, index)=> (
              <Link href="/categories/[id]" as={`/categories/${category.slug}_${category.id}`}
                key={category.id}
              >
                <a>
                  {`${category.name}${index + 1 < categories.length ? ', ' : ''}`}
                </a>
              </Link>
            ))}
          </div>

          <img src={images[0].src}
            className="main-details__product-image"
            alt={images[0].alt || `Image showing ${name}`}
          />

          <div className="main-details__secondary-actions">
            <button>
              Add To Wishlist
            </button>
            <button>
              Compare
            </button>
          </div>
          {/*<p>{avgRating} {ratingCount}</p>*/}
        </div>
      </section>

      <section className="full-details">
        <div className="full-details__header">
          <h3 className="full-details__title">
            <button className={`full-details__tab ${tab === 'description' ? 'is-current-tab' : ''}`}
              onClick={()=> switchTab('description')}
            >
              Description
            </button>
            {/*<button className={`full-details__tab ${tab === 2 ? 'is-current-tab' : ''}`}
              onClick={()=> switchTab(2)}
            >
              Specifications
            </button>*/}
            <button className={`full-details__tab ${tab === 'reviews' ? 'is-current-tab' : ''}`}
              onClick={()=> switchTab('reviews')}
            >
              Reviews
            </button>
          </h3>
        </div>

        {(()=> { //IIFE to switch on selected tab.
          switch (tab) {
            case 'description':
              return (
                <article className="full-details__wrapper product-description"
                  dangerouslySetInnerHTML={{
                    __html: description
                  }}
                ></article>
              );
            case 'reviews':
              return (
                <div className="full-details__wrapper product-reviews">
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
                          onClick={(event, index)=> { 
                            event.preventDefault();
                            setReviewFormData({
                            ...reviewFormData,
                            stars: index,
                          })}}
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
                          //e.stopPropagation;

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
                      >{
                        reviews.map((review)=> {
                          return (
                            <li key={review.id}>
                              <UserReview review={review} />
                            </li>
                          )
                        })
                      }</ul>
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
            default:
              return <p>Unknown description tab.</p>
          }
        })()}
      </section>

      <section className="related-products">
        <h2 className="related-products__title">
          Related Products
        </h2>

        <ul className="related-products__list">
          {relatedProducts.map((relatedProduct)=> {
            return (
              <li key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

ProductPage.getInitialProps = async ({ query })=> {
  try {
    const {slug_id} = query;
    const separatorIndex = slug_id.lastIndexOf('_');
    const id = slug_id.slice(separatorIndex + 1);
    const slug = slug_id.slice(0, separatorIndex);

    let {data: product} = await wooApi.get(`products/${id}`);
    let {data: relatedProducts} = await wooApi.get('products', {
      include: product.related_ids,
    });

    /*product = ((product)=> { // Use IIFE to isolate temporary vars in destructuring assignment.
      const {id, categories, name, permalink, price, sale_price, images} = product;

      return {id, categories, name, permalink, price, sale_price, images};
    })(product);*/

    const categoryTree = await getCategoryTree();

    return {
      slug,
      id,
      product,
      relatedProducts,
      categoryTree,
    };
  }

  catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range.
      console.log(error.response.status);
      //
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response recieved');
      //
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    console.log('Config', error.config);
    
    return {error};
  }
};
