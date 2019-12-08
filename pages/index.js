import Layout from '../components/my_layout';
import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';
import wooApi from '../constants/woo_api';
// import Head from 'next/head';

const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

const getCategoryTree = () => {
  // Make API call.

  // Build the array.
  const categoryTree = [
    ['Servers', 'link', [
      ['Rack Servers', 'link'],
      ['Tower Servers', 'Link'],
      ['Blade Servers', 'Link'],
    ]],
    ['Accessories', 'Link', [
      ['Memory', 'link'],
      ['Power Supplies', 'link'],
      ['Hard Drives', 'link'],
      ['Processors', 'link'],
      ['Controllers', 'link'],
      ['Adapters', 'link'],
      ['Rail Kits', 'link'],
      ['Cables', 'link'],
      ['Others', 'link'],
    ]],
    ['HPE Networking', 'link', [
      ['Networking Attached Storage', 'link'],
      ['MSA', 'link'],
      ['Tape Drives', 'link'],
    ]],
  ];

  return categoryTree;
};

export default function Blog(props) {
  return (
    <Layout categories={props.categoryTree}>
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
  console.log("Total of pages:", response.headers['x-wp-totalpages']);
  console.log("Total of items:", response.headers['x-wp-total']);

  return {
    products: response.data,
    categoryTree: getCategoryTree(),
  };
};


