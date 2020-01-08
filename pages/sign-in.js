// @ts-nocheck
// import Link from 'next/link';
import { useState, useEffect } from 'react';

import getCategoryTree from '../utils/category_tree';
import AppShell from '../app_shell';
import authenticate from '../utils/authenticate';
import './styles/sign-in.scss';

export default function signIn(props) {
  if (props.error)
    return ([
      <h1>Oops! There was an error</h1>,
      <p>{JSON.stringify(props.error)}</p>
    ]);

  let [email, setEmail] = useState('');
  let [authProgress, setAuthProgress] = useState({
    event: '',
    data: '',
  });

  useEffect(()=> {
    const {event, data} = authProgress;

    
  }, [authProgress]);

  const initiateAuthFlow = (event)=> {
    event.preventDefault ?
      event.preventDefault()
    : event.returnValue = false;
  
    setAuthProgress('submitting');
  
    authenticate(email, setAuthProgress);
    
    return false;
  };

  return (
    <AppShell categories={props.categoryTree}>
      <section className="sign-in">
      {((
        <p className="sign-in__check-mail-notice">
          <strong>Just one more step</strong><br />
          <span>
            We need to make sure it's really you.<br />
            We've sent a one-time secure sign-in link to your eMail address.
            Kindly check your inbox and click the link, then return here to continue shopping.<br />
            Be sure to check spam and promotions if you don't find it in your inbox.
            Note that the link expires in 15 minutes.
          </span>
          <strong>
            <abbr title="Important Notice">PS:</abbr>
            Do not close this tab.
          </strong>
        </p>
      ) : (
        <form className="sign-in__form"
          onSubmit={initiateAuthFlow}
          aria-live="polite"
        >
          <h1 className="sign-in__title">
            Sign in to IT Supplies
          </h1>
          <p className="sign-in__pitch">
            Enjoy the best shopping experience when you sign in.
            Add products to your wishlist, sync your cart across multiple devices,
            and speed up checkout with saved billing information.
          </p>

          <div className="sign-in__form-controls">
            <label className="sign-in__email-input">
              <span>
                It's easy, just enter your <b>eMail address.</b>
              </span>
              <input type="email"
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="jonsnow@westeros.wall"
              />
            </label>

            <button type="submit"
              className="sign-in__submit"
            >
              Sign in
            </button>
          </div>

          <p>{authProgress.event}</p>
        </form>
      )}
      </section>
    </AppShell>
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
