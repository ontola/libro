import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import HttpStatus from 'http-status-codes';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { studioMessages } from '../../lib/studioMessages';
import { serverDocumentsContext } from '../context/ServerDocumentsContext';

interface DocumentListProps {
  onSelect: (doc: string) => void;
}

export const DocumentList = ({ onSelect }: DocumentListProps): JSX.Element => {
  const { documents, reload, status } = React.useContext(serverDocumentsContext);

  const [deletionResource, setDeletionResource] = React.useState<string | undefined>(undefined);

  const selectForDelete = (resource: string) => {
    setDeletionResource(resource);
  };

  const handleClose = () => {
    setDeletionResource(undefined);
  };

  const handleDelete = React.useCallback(() => {
    fetch(deletionResource!, { method: 'DELETE' })
      .then(() => {
        setDeletionResource(undefined);
        reload();
      });
  }, [deletionResource]);

  if (status === HttpStatus.UNAUTHORIZED) {
    return (
      <Button
        href="/libro/login"
        variant="contained"
      >
        <FormattedMessage {...studioMessages.login} />
      </Button>
    );
  } else if (status === HttpStatus.FORBIDDEN) {
    return (
      <div>
        <FormattedMessage {...studioMessages.forbidden} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <List>
        {documents?.map((doc) => (
          <ListItem
            button
            key={doc}
            onClick={() => onSelect(doc)}
          >
            <ListItemText primary={doc} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="delete"
                edge="end"
                onClick={() => selectForDelete(doc)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => onSelect('')}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New" />
        </ListItem>
      </List>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={!!deletionResource}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          Delete document?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete document &quot;
            {deletionResource}
            &quot;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
