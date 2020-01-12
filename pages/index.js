// @ts-nocheck
/* //These must be the first lines in src/index.js
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';*/

import { useEffect, useState } from 'react';
// import Link from 'next/link';

import AppShell from '../app_shell';
import wooApi from '../api/services/woo_api';
import wpApi from '../api/services/wp_api';
import getCategoryTree from '../utils/category_tree';

import Carousel from '../components/carousel';

import FeaturedCategory from '../sections/homepage/featured_category';
import Bestsellers from '../sections/homepage/bestsellers';
import FeaturedProducts from '../sections/homepage/featured_products';
import './styles/index.scss';

export default function Homepage(props) {
  if (props.error)
    return ([
      <h1>Oops! There was an error</h1>,
      <p>{JSON.stringify(props.error)}</p>
    ]);

  const {categoryTree} = props;
  let [welcomeBanners, setWelcomeBanners] = useState(props.carousel);

  useEffect(()=> {
    if (window.innerHeight < window.innerWidth)
      wpApi('get', '/media', {categories: 31}) //Landscape mode
        .then((banners)=> setWelcomeBanners(banners));
      
      //window.onload = normalizeViewportHeight;
      //window.onresize = normalizeViewportHeight;
    
  }, []);

  return (
    <AppShell {...{categoryTree}}>
      <section className="landing-section">
        <Carousel mediaItems={welcomeBanners} />
      </section>

      <Bestsellers products={props.products} />

      <FeaturedCategory ftCategory={props.ftCategory} />

      <FeaturedProducts products={props.products} />
    </AppShell>
  );
}

Homepage.getInitialProps = async ()=> {
  try {
    // Get List of products
    let {data: products} = await wooApi.get("products", {
      per_page: 10, // 10 products per page
    });

    products = products.map((product)=> {
      const {id, categories, name, permalink, price, sale_price, images} = product;
      const newProductObj = {id, categories, name, permalink, price, sale_price, images};

      return newProductObj;
    });

    const categoryTree = await getCategoryTree();

    //Retrieve featured category object stashed on the categoryTree.
    /** Object representing the featured category.
     * {obj: as gotten from wooApi, tree: subtree as parsed by getCategoryTree}
     */
    const ftCategory = categoryTree.FEATURED_CATEGORY;
    let {data: ftCategoryProducts} = await wooApi.get("products", {
      per_page: 11, // 10 products per page
      category: ftCategory.obj.id,
    });
    ftCategory.products = ftCategoryProducts;

    const carousel = await wpApi('get', '/media', {categories: 32}) //Portrait mode by default.

    return {
      products,
      categoryTree,
      carousel,
      ftCategory,
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
      console.log('Error', error.message, '\n\t', error);
    }

    console.log('Config', error.config);
    
    return {error};
  }
};
