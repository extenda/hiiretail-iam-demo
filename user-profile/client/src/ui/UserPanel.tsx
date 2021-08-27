import { useQuery } from 'react-query';
import { Card } from '@hiiretail/synergy-ui';

import { getUserById } from '../backend';

export type UserPanelProps = {
  userId: string;
};

export const UserPanel: React.FC<UserPanelProps> = ({ userId }) => {
  const { data: user } = useQuery('single user', () => getUserById(userId));

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Card leading="User" header={user.name}>
      Groups: {JSON.stringify(user.groupIds, null, 4)}
    </Card>
  );
};
