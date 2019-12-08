import { useRouter } from 'next/router';
import Header from './header';
import Head from 'next/head';

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>IT Supplies</title>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
        <link rel="icon" href="https://s.gravatar.com/avatar/21fdb061656b2126f0827b618714ecd5?size=100&default=retro" />
      </Head>

      <Header />

      {props.children}
    </main>
  );
}