import { useRouter } from 'next/router';
import Header from './header';
import {Helmet} from "react-helmet";

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <Helmet>
        <title>IT Supplies</title>
        <link rel="icon" href="https://s.gravatar.com/avatar/21fdb061656b2126f0827b618714ecd5?size=100&default=retro" />
        <script src="https://use.fontawesome.com/406415add4.js"></script>
      </Helmet>

      <Header />
      
      {props.children}
    </main>
  );
}