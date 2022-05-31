import { AuthContext } from '../App';
import { useContext } from 'react';
import { Typography, Link } from '@hiiretail/synergy-ui';

export const Home: React.FC = () => {
  const { tokenCache, clearTokenCache } = useContext(AuthContext);

  console.log(tokenCache);
  if (tokenCache === null) {
    return (
      <div>
        <Typography as="h1">You are not logged in right now</Typography>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <Typography as="h1">You are logged in!</Typography>
      <Link to="/login" onClick={() => clearTokenCache()}>
        Logout and login again
      </Link>
      <Typography as="h3">Your IAM Id token</Typography>
      <Link to={`https://jwt.io/#debugger-io?token=${tokenCache.idToken}`}>
        Inspect IAM Id Token in JWT.io debugger
      </Link>
      <pre>{tokenCache.idToken}</pre>
      <Typography as="h3">Your Offline Id token (based on IAM token)</Typography>
      <Link to={`https://jwt.io/#debugger-io?token=${tokenCache.offlineToken}`}>
        Inspect Offline token in JWT.io debugger
      </Link>
      <pre>{tokenCache.offlineToken}</pre>
    </div>
  );
};
