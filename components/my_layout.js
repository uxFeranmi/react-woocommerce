import { useRouter } from 'next/router';
import Header from './header';
import Head from 'next/head';
import "../styles.scss";

const staticPath = process.env.staticPath || '';

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>IT Supplies</title>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
        <link rel="icon" href={`${staticPath}/favicon.png`} />
      </Head>

      <Header categories={props.categories} />

      {props.children}
    </main>
  );
}