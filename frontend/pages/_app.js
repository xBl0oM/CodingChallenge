import { MantineProvider } from '@mantine/core';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
