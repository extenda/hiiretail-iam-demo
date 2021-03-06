import {FC, useContext, useState} from 'react';
import {getTokenCache} from './getTokenCache';
import {Button, Flexbox, TextField} from '@hiiretail/synergy-ui';
import {AuthContext} from '../App';
import {BU_ID} from '../common/constants';
import {Redirect} from "react-router-dom";

interface LoginWithPinProps {
  onMissedCache: (operatorId: string, pin: string) => void;
}

export const LoginWithPin: FC<LoginWithPinProps> = (props) => {
  const [redirect, setRedirect] = useState(false)
  const {setTokenCache} = useContext(AuthContext);

  const [error, setError] = useState('');

  const [operatorId, setOperatorId] = useState('');
  const [pin, setPin] = useState('');

  const submitHandler = async () => {
    setError('');
    try {
      const res = await getTokenCache(BU_ID, operatorId, pin);
      if (res) {
        setTokenCache(res)
        setRedirect(true)
      } else {
        props.onMissedCache(operatorId, pin);
      }
    } catch (e: any) {
      console.log(e);
      setError(e.stack);
    }
  };

  if (redirect) {
    return <Redirect to={'/'}/>
  }

  return (
    <Flexbox container direction="column" gutter={4}>
      <TextField
        name="operatorId"
        label="OperatorId"
        onChange={(e) => setOperatorId(e.target.value)}
      />
      <TextField name="pin" label="Pin" onChange={(e) => setPin(e.target.value)}/>
      {error && <pre>{error}</pre>}
      <Button disabled={!(operatorId && pin)} onClick={submitHandler}>
        Login
      </Button>
    </Flexbox>
  );
};
