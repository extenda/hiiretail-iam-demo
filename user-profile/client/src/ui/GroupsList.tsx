import { useQuery } from 'react-query';
import { Group } from '../../../server/src/types/group';
import { getAllGroups } from '../backend-api';
import { List } from './List';
import { Loading } from './Loading';

export type GroupsListProps = {
  onSelect?: (group: Group) => void;
};

export const GroupsList: React.FC<GroupsListProps> = ({ onSelect }) => {
  const { data: groups } = useQuery('groups', () => getAllGroups());

  if (!groups) {
    return <Loading />;
  }

  return <List selectable items={groups} onSelect={onSelect} />;
};
