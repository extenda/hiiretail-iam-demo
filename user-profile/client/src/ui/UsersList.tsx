import { useQuery } from 'react-query';
import { Group } from '../../../server/src/types/group';
import { User } from '../../../server/src/types/user';
import { getUsersInGroup } from '../backend-api';
import { List } from './List';
import { Loading } from './Loading';

export type UsersListProps = {
  group: Group;
  selected?: string;
  onSelect?: (user: User) => void;
};

export const UsersList: React.FC<UsersListProps> = ({ group, onSelect, selected }) => {
  const { data: users } = useQuery(['users in group', group.id], () => getUsersInGroup(group.id));

  if (!users) {
    return <Loading />;
  }

  return <List selectable items={users} onSelect={onSelect} selected={selected} />;
};
