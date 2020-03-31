import { Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import editor from '../../../ontology/ontola/editor';
import DialogTopology from '../../../topologies/Dialog';

export const LinkElement = (props) => {
  const textEditor = useSlate();
  const ref = React.useRef();
  const [hasFocus] = Editor.nodes(textEditor, {
    match: (n) => n.type === editor.elements.link,
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [url, setUrl] = React.useState(props.attributes.href);

  return (
    <React.Fragment>
      <a {...props.attributes} ref={ref} >
        {props.children}
      </a>
      <Popover
        anchorEl={ref.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        open={!!hasFocus}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <span>
          {props.attributes.href}
          <button onClick={() => setOpenDialog(true)}>edit</button>
        </span>
      </Popover>
      <Dialog
        open={openDialog}
        maxWidth="md"
        onClose={() => setOpenDialog(false)}
      >
        <DialogTopology>
          <CardHeader title="Link" />
          <CardContent>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <TextField
                autoFocus
                label="Display text"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <TextField
                autoFocus
                label="Address"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={() => {
              setUrl(props.attributes.href);
              setOpenDialog(false);
            }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // TODO set url on node
                setOpenDialog(false);
              }}
            >
              Save
            </Button>
          </CardActions>
        </DialogTopology>
      </Dialog>
    </React.Fragment>
  );
};
