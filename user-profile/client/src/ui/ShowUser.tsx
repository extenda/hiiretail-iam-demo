import { useQuery } from 'react-query';
import { Card } from '@hiiretail/synergy-ui';

import { getUserById } from '../backend';

const JOHN_DOE_USER_ID = '7b4870a5ea985d422b73e98b13468b5a1211fe282f6a86feb37c220007ce9000';

export const ShowUser: React.FC = () => {
  const { data: user } = useQuery('single user', () => getUserById(JOHN_DOE_USER_ID));

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Card leading="User" header={user.name}>
      Groups: {JSON.stringify(user.groupIds, null, 4)}
    </Card>
  );
};
