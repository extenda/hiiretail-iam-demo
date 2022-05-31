import { FC, useState } from 'react';
import { getTokenCache } from './getTokenCache';
import { Button, Flexbox, TextField } from '@hiiretail/synergy-ui';
import homeMessages from './Login.messages';
import { useIntl } from 'react-intl';

interface LoginWithPinProps {
  onMissedCache: () => void;
}

export const LoginWithPin: FC<LoginWithPinProps> = (props) => {
  const intl = useIntl();

  const [operatorId, setOperatorId] = useState('');
  const [pin, setPin] = useState('');

  const submitHandler = async () => {
    const res = await getTokenCache('1', operatorId, pin);
    if (res === null) {
      props.onMissedCache();
    } else {
      console.log(res);
    }
  };

  return (
    <Flexbox container direction="column" gutter={4}>
      <TextField
        name="operatorId"
        label="OperatorId"
        onChange={(e) => {
          setOperatorId(e.target.value);
        }}
      />
      <TextField
        name="pin"
        label="Pin"
        onChange={(e) => {
          setPin(e.target.value);
        }}
      />
      <Button disabled={!(operatorId && pin)} onClick={submitHandler}>
        {intl.formatMessage(homeMessages.login)}
      </Button>
    </Flexbox>
  );
};
