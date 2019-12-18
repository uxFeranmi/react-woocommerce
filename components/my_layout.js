import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from './header';
import Footer from './footer';
import "../styles.scss";

const staticPath = process.env.staticPath || '';

export default function Layout(props) {
  const router = useRouter();

  return (
    <main className="app-shell">
      <Head>
        <title>IT Supplies</title>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
        <link rel="icon" href={`${staticPath}/favicon.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header categories={props.categories} />

      {props.children}

      <Footer />
    </main>
  );
}