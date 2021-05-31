import Head from 'next/head';
import App from '@components/App';

export { getServerSideProps } from '@components/Chakra';

export default function Home() {
  return (
    <div>
      <Head>
        <title>flipnotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
}
