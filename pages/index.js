import Layout from '../components/my_layout';
import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';
import wooApi from '../constants/woo_api';
// import Head from 'next/head';
import './styles/index.scss';

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

export default function Blog(props) {
  return (
    <Layout categories={props.categoryTree}>
      <section className="landing-section">
        <div className="dark-background"></div>
        <div className="landing-section__content">
          <h2 className="landing-section__text">
            Affordable, Reliable.
          </h2>
          <p className="landing-section__text">
            We sell only the best quality products
          </p>
        </div>
      </section>
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


