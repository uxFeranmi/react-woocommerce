import { useRouter } from 'next/router';

export default function Layout(props) {
  const router = useRouter();

  return (
    <main>
      <h1>{router.query.id}</h1>
      {props.children}
    </main>
  );
}