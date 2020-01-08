//import { useRouter } from 'next/router';
import Head from 'next/head';
import Router from "next/router";
import NProgress from "nprogress";

import Header from './components/header';
import Footer from './components/footer';
import "./styles.scss";
import "./nprogress.scss";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};
/*
NProgress.set(0.4);
//Incrementing:
NProgress.inc();
//To increment by a specific value,
NProgress.inc(0.2);
*/

export default function AppShell(props) {
  //const routerHook = useRouter();

  return [ //Return an array of elements to keep header out of the <main> tag.
    (<Head key={'Document Head'}>
      <title>IT Supplies</title>
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>),

    <Header categories={props.categories} key={'Page Header'} />,

    (<main className="app-shell" key={'Main Content'}>
      {props.children}
    </main>),

    <Footer key={'Page Footer'} />
  ];
}
