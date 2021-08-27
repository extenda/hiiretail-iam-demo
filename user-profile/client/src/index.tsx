import ReactDOM from 'react-dom';
import { CommonProviders } from '@hiiretail/core';

import App from './App';

ReactDOM.render(
  <CommonProviders intlMessages={{ en: {} }}>
    <App />
  </CommonProviders>,
  document.getElementById('root'),
);
