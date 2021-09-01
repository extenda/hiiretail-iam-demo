import { Box, Typography } from '@hiiretail/synergy-ui';

export type ListItemProps = {
  name: string;
  selected?: boolean;
};

export const ListItem: React.FC<ListItemProps> = ({ selected, name }) => {
  const itemStyle: React.CSSProperties = {
    border: `1px solid black`,
    background: selected ? 'black' : 'white',
    color: selected ? 'white' : 'black',
  };

  return (
    <Box p={4} m={1} style={itemStyle}>
      <Typography weight={selected ? 'bold' : 'regular'}>{name}</Typography>
    </Box>
  );
};
