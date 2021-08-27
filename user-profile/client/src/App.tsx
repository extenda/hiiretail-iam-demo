import { Flexbox } from '@hiiretail/synergy-ui';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ShowUser } from './ui/ShowUser';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Flexbox container direction="column">
        <ShowUser />
      </Flexbox>
    </QueryClientProvider>
  );
};

export default App;
