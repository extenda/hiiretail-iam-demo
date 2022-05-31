import { FC, useContext, useState } from 'react';
import { Button, Flexbox, TextField, Typography } from '@hiiretail/synergy-ui';
import { fbApp } from '../common/fb-app';
import { saveTokenCache } from './saveTokenCache';
import { BU_ID } from '../common/constants';
import { AuthContext } from '../App';

export interface LoginWithFirebaseProps {
  operatorId: string;
  pin: string;
}

export const LoginWithFirebase: FC<LoginWithFirebaseProps> = (props) => {
  const { setTokenCache } = useContext(AuthContext);

  const [error, setError] = useState('');

  const [email, setEmail] = useState('token-cache-demo@demo.dev');
  const [password, setPassword] = useState('V$ry-str0ng-password');

  const submitHandler = async () => {
    setError('');
    try {
      fbApp.auth().tenantId = 'testrunner-2mfuk'; // hardcoded testrunner prod tenant
      const result = await fbApp.auth().signInWithEmailAndPassword(email, password);
      const tokenResult = await result.user?.getIdTokenResult();
      if (!tokenResult) {
        throw new Error('could not get id token for fb user :(');
      }

      const tokenCache = await saveTokenCache(
        BU_ID,
        props.operatorId,
        props.pin,
        tokenResult.token,
      );

      setTokenCache(tokenCache);
    } catch (e: any) {
      setError(e.stack);
    }
  };

  return (
    <Flexbox container direction="column" gutter={4}>
      <Typography as="h1">
        We haven't been able to get token from Token cache, Force user to login with full
        credentials
      </Typography>
      <br />
      <Typography as="h1">
        Form defaults to valid user credentials in testrunner tenant, special for testing
      </Typography>
      <TextField
        name="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <pre>{error}</pre>}
      <Button disabled={!(email && password)} onClick={submitHandler}>
        Login
      </Button>
    </Flexbox>
  );
};
