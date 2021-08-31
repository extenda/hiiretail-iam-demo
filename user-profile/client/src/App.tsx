import { Box, Flexbox, Icon, Typography } from '@hiiretail/synergy-ui';
import React, { useState } from 'react';
import { Group } from '../../server/src/types/group';
import { addUserToGroup, removeUserFromGroup } from './backend-api';
import { FindUserDialog } from './ui/FindUserDialog';
import { GroupsList } from './ui/GroupsList';
import { UserPanel } from './ui/UserPanel';
import { UsersList } from './ui/UsersList';

const App: React.FC = () => {
  const [group, setGroup] = useState<Group>();
  const [userId, setUserId] = useState<string>();
  const [findUserDialogOpen, setFindUserDialogOpen] = useState(false);
  const refetchUsersInGroup = () => {
    setGroup(undefined);
    setGroup(group);
    setUserId(undefined);
  };

  return (
    <Flexbox container gutter={4}>
      <FindUserDialog
        onFind={async (userId) => {
          await addUserToGroup(group?.id || '', userId);

          refetchUsersInGroup();
        }}
        open={findUserDialogOpen}
        onOpenChange={setFindUserDialogOpen}
      />
      <Flexbox item width="100px" columnSize={4}>
        <Typography onClick={() => setUserId(undefined)}>Groups</Typography>
        <GroupsList
          onSelect={(group) => {
            setGroup(group);
            setUserId(undefined);
          }}
        />
      </Flexbox>
      <Flexbox item width="100px" columnSize={4}>
        <Flexbox container>
          <Flexbox item columnSize={12}>
            <Typography>Users</Typography>
          </Flexbox>
          {group && (
            <Box onClick={() => setFindUserDialogOpen(true)}>
              <Icon.Plus />
            </Box>
          )}
          {group && userId && (
            <Box
              onClick={async () => {
                await removeUserFromGroup(group.id, userId);

                refetchUsersInGroup();
              }}>
              <Icon.Delete />
            </Box>
          )}
        </Flexbox>
        {group ? (
          <UsersList group={group} selected={userId} onSelect={(user) => setUserId(user.id)} />
        ) : (
          <Typography>Select group</Typography>
        )}
      </Flexbox>
      <Flexbox item width="100px" columnSize={4}>
        <Typography>User info</Typography>
        <br />
        {userId ? <UserPanel userId={userId} /> : <Typography>Select user</Typography>}
      </Flexbox>
    </Flexbox>
  );
};

export default App;
