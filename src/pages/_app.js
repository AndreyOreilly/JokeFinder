import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/cards.css';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
