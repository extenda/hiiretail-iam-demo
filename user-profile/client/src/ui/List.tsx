import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';

export type ItemInfo = {
  readonly id: string;
  readonly name: string;
};

export type ListProps<T extends ItemInfo> = {
  items: T[];
  selected?: string;
  selectable?: boolean;
  onSelect?: (item: T) => void;
};

const listStyle: React.CSSProperties = {
  listStyleType: 'none',
  margin: '0px',
  padding: '0px',
};

export const List = <T extends ItemInfo>({
  items,
  selectable,
  selected,
  onSelect: onItemClick,
}: ListProps<T>): React.ReactElement => {
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    setSelectedId(selected);
  }, [selected]);

  const listItems = items.map((item) => (
    <li
      key={item.id}
      onClick={() => {
        if (selectable) {
          setSelectedId(item.id);
        }
        onItemClick?.(item);
      }}>
      <ListItem name={item.name} selected={item.id === selectedId} />
    </li>
  ));

  return <ul style={listStyle}>{listItems}</ul>;
};
