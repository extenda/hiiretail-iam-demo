import React, { useState } from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

// Dynamically loaded page example
const Home = loadable(() => import('./Login'), {
  fallback: <div>Loading...</div>,
});
const Todo = loadable(() => import('./Todo'), {
  fallback: <div>Loading...</div>,
});

const AuthContext = React.createContext({
  tokenCache: null,
  setTokenCache: (arg: any) => {},
});

const App: React.FC = () => {
  const [tokenCache, setTokenCache] = useState(null);

  return (
    <AuthContext.Provider value={{ tokenCache, setTokenCache }}>
      <Router basename={REACT_APP_PUBLIC_URL}>
        <div className="App">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/content">
              <Todo />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
