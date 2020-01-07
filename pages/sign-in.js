// @ts-nocheck
// import Link from 'next/link';

import getCategoryTree from '../utils/category_tree';
import Layout from '../components/my_layout';
import './styles/sign-in.scss';

export default function signIn(props) {
  if (props.error)
    return ([
      <h1>Oops! There was an error</h1>,
      <p>{JSON.stringify(props.error)}</p>
    ]);

  return (
    <Layout categories={props.categoryTree}>
      <section className="sign-in">
        <label className="sign-in__email-input">
          Email:
          <input type="email" />
        </label>
      </section>
    </Layout>
  );
};

signIn.getInitialProps = async ()=> {
  try {
    const categoryTree = await getCategoryTree();

    return {
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
      console.log('Error', error.message, '\n\t', error);
    }

    console.log('Config', error.config);
    
    return {error};
  }
};
