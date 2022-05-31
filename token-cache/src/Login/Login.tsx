import { FC, useState } from 'react';
import { LoginWithFirebase } from './LoginWithFirebase';
import { LoginWithPin } from './LoginWithPin';

export type LoginStateMachine =
  | { state: 'pinLogin'; operatorId: undefined; pin: undefined }
  | { state: 'fullLogin'; operatorId: string; pin: string };

const defaultState: LoginStateMachine = {
  state: 'pinLogin',
  operatorId: undefined,
  pin: undefined,
};

const useLoginState = () => {
  const [step, setState] = useState<LoginStateMachine>(defaultState);

  return { step, setStep: setState };
};

export const Login: FC = () => {
  const { step, setStep } = useLoginState();

  switch (step.state) {
    case 'pinLogin':
      return (
        <LoginWithPin
          onMissedCache={(operatorId, pin) => setStep({ state: 'fullLogin', operatorId, pin })}
        />
      );
    case 'fullLogin':
      return <LoginWithFirebase operatorId={step.operatorId} pin={step.pin} />;
  }
};
