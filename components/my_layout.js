import { useRouter } from 'next/router';
import Header from './header';
import {Helmet} from "react-helmet";

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <Helmet>
        <link rel="icon" href="https://s.gravatar.com/avatar/21fdb061656b2126f0827b618714ecd5?size=100&default=retro" />
      </Helmet>

      <Header />

      {props.children}
    </main>
  );
}