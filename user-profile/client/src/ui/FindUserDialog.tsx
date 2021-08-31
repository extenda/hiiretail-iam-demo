import { Box, Button, TextField, Typography } from '@hiiretail/synergy-ui';
import Modal from '@material-ui/core/Modal';
import { useEffect, useState } from 'react';
import { findUser } from '../backend-api';

export type FindUserDialogProps = {
  open: boolean;
  onOpenChange: (opened: boolean) => void;
  onFind: (userId: string) => void;
};

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  width: 600,
  height: 300,
  backgroundColor: 'white',
  border: '1px solid black',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const FindUserDialog: React.FC<FindUserDialogProps> = ({ open, onOpenChange, onFind }) => {
  const [foundUserId, setFoundUserId] = useState<string | null>();
  const [userName, setUserName] = useState<string>();
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
    setFoundUserId(undefined);
    setUserName(undefined);
  }, [open]);

  return (
    <Modal
      open={isOpen}
      onClose={() => onOpenChange(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Box p={2} style={modalStyle}>
        <Typography>Find user</Typography>
        <Box p={2}>
          <TextField
            name="name"
            label="Name"
            hideLabel
            prefix="Name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </Box>
        <Button
          onClick={async () => {
            const user = await findUser(userName);

            setFoundUserId(user?.id ?? null);
          }}>
          Find
        </Button>
        {foundUserId !== undefined && (
          <Typography>User ID: {foundUserId ?? '[NOT FOUND]'}</Typography>
        )}
        {foundUserId && (
          <Button
            onClick={() => {
              onFind(foundUserId);
              setIsOpen(false);
              onOpenChange(false);
            }}>
            Confirm
          </Button>
        )}
      </Box>
    </Modal>
  );
};
