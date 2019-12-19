//import Link from 'next/link';
// import Head from 'next/head';
import { useEffect, useState } from 'react';

import Layout from '../components/my_layout';
import wooApi from '../services/woo_api';
import wpApi from '../services/wp_api';

import Carousel from '../components/carousel';

import FeaturedCategory from '../sections/homepage/featured_category';
import Bestsellers from '../sections/homepage/bestsellers';
import FeaturedProducts from '../sections/homepage/featured_products';
import './styles/index.scss';

const getCategoryTree = () => {
  // Make API call.

  // Build the array.
  const categoryTree = [
    ['Servers', 'link/1', [
      ['Rack Servers', 'link/2'],
      ['Tower Servers', 'Link/3'],
      ['Blade Servers', 'Link/4'],
    ]],
    ['Accessories', 'Link/5', [
      ['Memory', 'link/6'],
      ['Power Supplies', 'link/7'],
      ['Hard Drives', 'link/8'],
      ['Processors', 'link/9'],
      ['Controllers', 'link/10'],
      ['Adapters', 'link/11'],
      ['Rail Kits', 'link/12'],
      ['Cables', 'link/13'],
      ['Others', 'link/14'],
    ]],
    ['HPE Networking', 'link/15', [
      ['Networking Attached Storage', 'link/16'],
      ['MSA', 'link/17'],
      ['Tape Drives', 'link/18'],
    ]],
  ];

  return categoryTree;
};

export default function Homepage(props) {
  let [welcomeBanners, setWelcomeBanners] = useState(props.carousel);

  useEffect(()=> {
    if (window.innerHeight < window.innerWidth)
      wpApi('get', '/media', {categories: 31}) //Landscape mode
        .then((banners)=> setWelcomeBanners(banners));
      
      //window.onload = normalizeViewportHeight;
      //window.onresize = normalizeViewportHeight;
    
  }, []);

  return (
    <Layout categories={props.categoryTree}>
      <section className="landing-section">
        <Carousel mediaItems={welcomeBanners} />
      </section>

      <Bestsellers products={props.products} />

      <FeaturedCategory products={props.products} />

      <FeaturedProducts products={props.products} />
    </Layout>
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

      return {id, categories, name, permalink, price, sale_price, images};
    });

    const categoryTree = getCategoryTree();

    const carousel = await wpApi('get', '/media', {categories: 32}) //Portrait mode by default.

    return {
      products,
      categoryTree,
      carousel,
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
    
    return {};
  }
};
