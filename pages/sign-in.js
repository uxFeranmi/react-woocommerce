// @ts-nocheck
// import Link from 'next/link';
// import Router from 'next/router';
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
  let [mainContent, setMainContent] = useState('');
  let [authProgress, setAuthProgress] = useState({
    event: '',
    data: '',
  });

  useEffect(()=> {
    const {event, data} = authProgress;

    switch (event) {
      case 'mailsent':
        setMainContent('mailsent');
        break;
      case 'authenticated':
        setMainContent('authenticated');
        break;
      case 'timeout':
        setMainContent('timeout');
        break;
      case 'error':
        setMainContent('error');
        break;
    }
  }, [authProgress]);

  const initiateAuthFlow = (event)=> {
    console.log('event.preventDefault');
    event.preventDefault ?
      event.preventDefault()
    : event.returnValue = false;
    
    setAuthProgress({
      event: 'submitting',
      data: 'Sending eMail address to server...',
    });
  
    authenticate(email, setAuthProgress);
    
    return false;
  };

  return (
    <AppShell categories={props.categoryTree}>
      <section className="sign-in" aria-live="polite">
      {(()=> {
        switch (mainContent) {
          case 'form': {
            return (
              <form className="sign-in__form"
                onSubmit={initiateAuthFlow}
              >
                <h1 className="sign-in__form__title">
                  Sign in to IT Supplies
                </h1>
                <p className="sign-in__form__pitch">
                  Enjoy the best shopping experience when you sign in.
                  Add products to your wishlist, sync your cart across multiple devices,
                  and speed up checkout with saved billing information.
                </p>

                <div className="sign-in__form__controls">
                  <label className="sign-in__form__email-input">
                    <span>
                      It's easy, just enter your <b>eMail address.</b>
                    </span>
                    <input type="email" required
                      onChange={(e)=> setEmail(e.target.value)}
                      placeholder="jonsnow@westeros.wall"
                    />
                  </label>

                  <button type="submit"
                    className="sign-in__form__submit"
                  >
                    {authProgress.event === '' ?
                      'Sign in'
                    : authProgress.event === 'submitting' ?
                      'Loading...'
                    : authProgress.event === 'received' ?
                      'Sending your link...'
                    : '...'
                    }
                  </button>
                </div>
              </form>
            );
          }
          case 'mailsent':
            return (
              <div className="sign-in__mailsent">
                <h2 className="sign-in__mailsent__heading">
                  Just one more step...
                </h2>
                <p className="sign-in__mailsent__body">
                  <span>
                    We need to make sure it's really you.
                    <br />
                    We've sent a one-time secure sign-in link to your eMail address. 
                    Kindly check your inbox and click the link, then return here to continue shopping.
                  </span>
                  <br />
                  <small>
                    Be sure to check spam and promotions if you don't find it in your inbox. 
                    Note that the link expires in 15 minutes.
                  </small>
                  <br />
                  <strong>
                    <abbr title="Important Notice">PS: </abbr>
                    Do not close this tab.
                  </strong>
                </p>
              </div>
            );
          case 'authenticated':
            return (
              <p className="sign-in__success">
                <strong>All done!</strong>
                <span>You've successfully signed in.</span>
                <span>You may return to your previous activity.</span>
                <button className="sign-in__success__actions"
                  onClick={(e)=> window && window.history.back()}
                >
                  Return
                </button>
              </p>
            );
          case 'timeout':
            return (
              <div className="sign-in__timeout">
                <h1 className="sign-in__timeout__heading">
                  Timeout
                </h1>
                <p className="sign-in__timeout__body">
                  You sign-in link has expired.
                  You must generate a new link to sign-in.
                </p>
                <button className="sign-in__timeout__action"
                  onClick={(e)=> window && window.location.reload()}
                >
                  Get new link
                </button>
              </div>
            );
          case 'error':
            return (
              <p className="sign-in__error">
                <strong>Error!</strong>
                <span>Sincere apologies. Something went wrong.</span>
                <span>Message: {'' + authProgress.data}</span>
                <button className="sign-in__error__action"
                  onClick={(e)=> window && window.location.reload()}
                >
                  Please try again
                </button>
              </p>
            );
          //
        }
      })()}
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
