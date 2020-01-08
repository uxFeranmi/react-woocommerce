// @ts-nocheck
// import Link from 'next/link';
import { useState } from 'react';

import getCategoryTree from '../utils/category_tree';
import Layout from '../components/my_layout';
import './styles/sign-in.scss';
import authenticate from '../utils/authenticate';

export default function signIn(props) {
  if (props.error)
    return ([
      <h1>Oops! There was an error</h1>,
      <p>{JSON.stringify(props.error)}</p>
    ]);

  let [email, setEmail] = useState('');
  let [authProgress, setAuthProgress] = useState('');

  const initiateAuthFlow = (event)=> {
    event.preventDefault ?
      event.preventDefault()
    : event.returnValue = false;
  
    setAuthProgress('submitting');
  
    authenticate(email, setAuthProgress);
    
    return false;
  };

  return (
    <Layout categories={props.categoryTree}>
      <section className="sign-in">

        <form className="sign-in__form"
          onSubmit={initiateAuthFlow}
        >
          <h1>Sign In To IT Supplies</h1>
          <p>
            Enjoy the best shopping experience when you sign in.
            Add products to your wishlist, sync your cart across multiple devices,
            and speed up checkout with saved billing information.
          </p>
          <p>It's easy, just enter your eMail address.</p>
          <label className="sign-in__email-input">
            Email:
            <input type="email"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </label>

          <button type="submit">Sign in</button>
        </form>

        <p>{authProgress}</p>
      </section>
    </Layout>
  );
};

signIn.getInitialProps = async ()=> {
  try {
    //const categoryTree = await getCategoryTree();

    return {
      categoryTree: [],
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
