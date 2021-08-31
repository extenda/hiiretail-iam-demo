import ReactDOM from 'react-dom';
import { CommonProviders } from '@hiiretail/core';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

ReactDOM.render(
  <CommonProviders intlMessages={{ en: {} }}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CommonProviders>,
  document.getElementById('root'),
);
