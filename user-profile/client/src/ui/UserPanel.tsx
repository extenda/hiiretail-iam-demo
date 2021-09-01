import { useQuery } from 'react-query';
import { Box, Typography } from '@hiiretail/synergy-ui';

import { getUserById } from '../backend-api';
import { Loading } from './Loading';

export type UserPanelProps = {
  userId: string;
};

const borderStyle: React.CSSProperties = {
  border: '1px solid black',
  padding: '4px',
};

export const UserPanel: React.FC<UserPanelProps> = ({ userId }) => {
  const { data: user } = useQuery(['user', userId], () => getUserById(userId));

  if (!user) {
    return <Loading />;
  }

  return (
    <Box p={4} m={1} style={borderStyle}>
      <Typography>Id: {user.id.slice(0, 12)}...</Typography>
      <br />
      <Typography>Name: {user.name}</Typography>
      <br />
      <Typography>Emails:</Typography>
      <br />
      <table style={{ ...borderStyle, borderCollapse: 'collapse' }}>
        <tr>
          <th style={borderStyle}>Type</th>
          <th style={borderStyle}>Email</th>
        </tr>
        {user.emails.map((email) => (
          <tr>
            <td style={borderStyle}>
              <Typography>{email.type}</Typography>
            </td>
            <td style={borderStyle}>
              <Typography>{email.value}</Typography>
            </td>
          </tr>
        ))}
      </table>
      <Typography>Groups:</Typography>
      <ul style={{ margin: 0 }}>
        {user.groupIds.map((groupId) => (
          <li>
            <Typography>{groupId}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};
