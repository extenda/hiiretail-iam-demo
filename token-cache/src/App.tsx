import React, { useState } from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TokenCache } from './Login/getTokenCache';

const { REACT_APP_PUBLIC_URL } = process.env;

// Dynamically loaded page example
const Home = loadable(() => import('./Home'), {
  fallback: <div>Loading...</div>,
});
const Login = loadable(() => import('./Login'), {
  fallback: <div>Loading...</div>,
});

// Keeps track of the token cache value.
export const AuthContext = React.createContext<{
  tokenCache: TokenCache | null;
  setTokenCache: (value: TokenCache) => void;
  clearTokenCache: () => void;
}>({
  tokenCache: null,
  setTokenCache: () => undefined,
  clearTokenCache: () => undefined,
});

const App: React.FC = () => {
  const [tokenCache, setTokenCache] = useState<TokenCache | null>(null);

  return (
    <AuthContext.Provider
      value={{
        tokenCache,
        setTokenCache: (value) => setTokenCache(value),
        clearTokenCache: () => setTokenCache(null),
      }}>
      <Router basename={REACT_APP_PUBLIC_URL}>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
