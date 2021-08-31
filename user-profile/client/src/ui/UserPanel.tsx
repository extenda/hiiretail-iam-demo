import { useQuery } from 'react-query';
import { Box, Typography } from '@hiiretail/synergy-ui';

import { getUserById } from '../backend-api';
import { Loading } from './Loading';

export type UserPanelProps = {
  userId: string;
};

const userPanelStyle: React.CSSProperties = {
  border: '1px solid black',
};

export const UserPanel: React.FC<UserPanelProps> = ({ userId }) => {
  const { data: user } = useQuery(['user', userId], () => getUserById(userId));

  if (!user) {
    return <Loading />;
  }

  return (
    <Box p={4} m={1} style={userPanelStyle}>
      <Typography>Id: {user.id.slice(0, 12)}...</Typography>
      <br />
      <Typography>Name: {user.name}</Typography>
      <br />
      <Typography>Groups: {user.groupIds.join(', ')}</Typography>
    </Box>
  );
};
