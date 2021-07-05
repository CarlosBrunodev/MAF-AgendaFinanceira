import Head from "next/head";
import "tailwindcss/tailwind.css";
import { Provider } from 'next-auth/client'
import "../styles/global.css";
const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
        <Head>
          <title>MAF - MINHA AGENDA FINANCEIRA</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="MAF - Minha agenda digital"
          />
          </Head>
        <Component {...pageProps} />
    </Provider>
   
  );
};

export default App;
