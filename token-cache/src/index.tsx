import ReactDOM from 'react-dom';
import { CommonProviders } from '@hiiretail/core';

import App from './App';
import reportWebVitals from './reportWebVitals';
import intlMessages from './i18n';
import { createTheme } from '@hiiretail/synergy-ui';
import { QueryClient } from 'react-query';
import { getPermissions } from './common/utils/getPermissions';

if (process.env.NODE_ENV === 'development') {
  try {
    require('./mocks');
    console.log('Mocks imported');
  } catch {
    // If folder doesn't exist, do nothing
  }
}
const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <CommonProviders
    intlMessages={intlMessages}
    locale="en"
    theme={theme}
    queryClient={queryClient}
    getPermissions={getPermissions}>
    <App />
  </CommonProviders>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
