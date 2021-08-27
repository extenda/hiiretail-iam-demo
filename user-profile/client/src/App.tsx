import { Flexbox } from '@hiiretail/synergy-ui';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserPanel } from './ui/UserPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const JOHN_DOE_USER_ID = '7b4870a5ea985d422b73e98b13468b5a1211fe282f6a86feb37c220007ce9000';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Flexbox container direction="column">
        <UserPanel userId={JOHN_DOE_USER_ID} />
      </Flexbox>
    </QueryClientProvider>
  );
};

export default App;
