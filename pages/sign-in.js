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

  // let [email, setEmail] = useState('');
  let [authProgress, setAuthProgress] = useState('');

  const initiateAuthFlow = (event)=> {
    event.preventDefault ?
      event.preventDefault()
    : event.returnValue = false;
  
    setAuthProgress('submitting');
  
    const sse = new EventSource(`/api/auth/sign-in?email=${event.target.value}`);

    sse.addEventListener("mailsent", function(e) {
      setAuthProgress('mailsent');
      console.log(`${e.type}: ${e.data}`);
    });

    sse.addEventListener("authenticated", function(e) {
      setAuthProgress('authenticated');
      console.log(`${e.type}: ${e.data}`);
    });

    sse.addEventListener("timeout", function(e) {
      setAuthProgress('timeout');
      console.log(`${e.type}: ${e.data}`);
    });

    sse.addEventListener("received", function(e) {
      setAuthProgress('received');
      console.log(`${e.type}: ${e.data}`);
    });

    sse.addEventListener("message", function(e) {
      console.log('Default message event\n', e);
    })
    return false;
  };

  return (
    <Layout categories={props.categoryTree}>
      <section className="sign-in">

        <form className="sign-in__form"
          onSubmit={initiateAuthFlow}
        >
          <label className="sign-in__email-input">
            Email:
            <input type="email" />
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
