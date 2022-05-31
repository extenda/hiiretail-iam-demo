import { FC, useState } from 'react';
import { LoginWithPin } from './LoginWithPin';

export const Login: FC = (props, context) => {
  const [state, setState] = useState<'pinLogin' | 'fullLogin'>('pinLogin');

  switch (state) {
    case 'pinLogin':
      return <LoginWithPin onMissedCache={() => setState('fullLogin')} />;
    case 'fullLogin':
      return <div>adfghjk</div>;
  }
};
