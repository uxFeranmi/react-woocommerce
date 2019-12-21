//import { useRouter } from 'next/router';
// import Head from 'next/head';
import Link from 'next/link';
//import { useEffect, useState } from 'react';

import Layout from '../../components/my_layout';
import wooApi from '../../services/woo_api';
import getCategoryTree from '../../services/category_tree';
//import wpApi from '../../services/wp_api';

import Subcategories from '../../sections/category_page/subcategories';
import Products from '../../sections/category_page/products';

import './styles/[slug_id].scss';

export default function CategoryPage(props) {
  if (props.error) return JSON.stringify(props.error);
  //const router = useRouter();

  return (
    <Layout categories={props.categoryTree}>
      <Subcategories subcategories={props.subcategories} />

      <Products products={props.products} category={props.category} />
    </Layout>
  );
}

CategoryPage.getInitialProps = async ({ query })=> {
  try {
    const {slug_id} = query;
    const separatorIndex = slug_id.lastIndexOf('_');
    const id = slug_id.slice(separatorIndex + 1);
    const slug = slug_id.slice(0, separatorIndex);

    let {data: category} = await wooApi.get(`products/categories/${id}`);

    // Fetch subcategories.
    let {data: subcategories} = await wooApi.get(`products/categories`, {
      parent: id,
    });

    // Get List of products in categpry.
    let {data: products} = await wooApi.get('products', {
      category: id,
      per_page: 20, // 20 products per page
    });

    products = products.map((product)=> {
      const {id, categories, name, permalink, price, sale_price, images} = product;

      return {id, categories, name, permalink, price, sale_price, images};
    });

    const categoryTree = await getCategoryTree();

    return {
      slug,
      id,
      category,
      subcategories,
      products,
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
