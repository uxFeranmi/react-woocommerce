import Layout from '../components/my_layout';
import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';
import wooApi from '../constants/woo_api';
import "../styles.scss";
import Head from 'next/head';

const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

export default function Blog(props) {
  return (
    <Layout>
      <Head>
        <title>IT Supplies</title>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
      </Head>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" />
        <PostLink id="learn-nextjs" />
        <PostLink id="deploy-nextjs" />
      </ul>
      <ul>
        {props.products.map(product => product.name)}
      </ul>      
    </Layout>
  );
}

Blog.getInitialProps = async function() {
  // Get List of products
  const response = await wooApi.get("products", {
    per_page: 20, // 20 products per page
  }).catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  });
  
  if (!response) return {};

  // Successful request
  console.log("Response Status:", response.status);
  console.log("Response Headers:", response.headers);
  console.log("Total of pages:", response.headers['x-wp-totalpages']);
  console.log("Total of items:", response.headers['x-wp-total']);

  return {
    products: response.data,
  };
};
