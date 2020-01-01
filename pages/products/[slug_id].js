import Link from 'next/link';
import { useState, useEffect } from 'react';

import Layout from '../../components/my_layout';
import wooApi from '../../services/woo_api';
import getCategoryTree from '../../services/category_tree';
//import wpApi from '../../services/wp_api';

import ProductCard from '../../components/product_card';
import ProductReviews from '../../sections/product_page/reviews';
import ProductPrice from '../../components/product_price';

import './styles/[slug_id].scss';

export default function ProductPage(props) {
  if (props.error) return JSON.stringify(props.error);

  let [tab, switchTab] = useState('description');

  let [reviews, setReviews] = useState([]);
  let [gotReviews, setGotReviews] = useState(false);

  const renderNewReview = (review)=> {
    let updatedReviews = [...reviews];
    updatedReviews.splice(0, 0, review);
    setReviews(updatedReviews);
  }

  const {
    categoryTree,
    product: {
      categories,
      images,
      name,
      short_description: shortDesc,
      price,
      description,
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
        <div className="main-details__product-image-wrapper">
          <small className="main-details__categories">
            {categories.map((category, index)=> (
              <Link href="/categories/[id]" as={`/categories/${category.slug}_${category.id}`}
                key={category.id}
              >
                <a>
                  {`${category.name}${index + 1 < categories.length ? ', ' : ''}`}
                </a>
              </Link>
            ))}
          </small>

          <img src={images[0].src}
            className="main-details__product-image"
            alt={images[0].alt || `Image showing ${name}`}
          />

          <div className="main-details__secondary-actions">
            <button>
              <i className="fa fa-heart-o" aria-hidden={true}>&nbsp;</i>
              Add To Wishlist
            </button>
            <button>
              <i className="fa fa-check-square-o" aria-hidden={true}>&nbsp;</i>
              Compare
            </button>
          </div>
          {/*<p>{avgRating} {ratingCount}</p>*/}
        </div>
      
        <div className="main-details__text-content">
          <h1>{name}</h1>

          <div className="main-details__short-description"
            dangerouslySetInnerHTML={{ __html: shortDesc }}
          ></div>

          <ProductPrice className="main-details__price"
            price={price}
            oldPrice={''}
          />

          <div className="main-details__action">
            <label>Quantity:
              <input type="number" defaultValue="1" />
            </label>

            <button>Buy Now</button>
          </div>
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
                  dangerouslySetInnerHTML={{__html: description}}
                ></article>
              );
            case 'reviews':
              return (
                <ProductReviews className="full-details__wrapper"
                  {...{reviews, gotReviews, renderNewReview}}
                  //reviews={reviews} gotReviews={gotReviews}
                  product={props.product} //renderNewReview={renderNewReview}
                />
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
