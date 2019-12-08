import { useRouter } from 'next/router';
import Header from './header';
import Head from 'next/head';

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <Head>
        <link rel="icon" href="https://s.gravatar.com/avatar/21fdb061656b2126f0827b618714ecd5?size=100&default=retro" />
      </Head>

      <Header />

      {props.children}
    </main>
  );
}