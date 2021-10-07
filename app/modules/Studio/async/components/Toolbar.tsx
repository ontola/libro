import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';
import { useLRS } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { studioToolbarMessages } from '../../../../translations/messages';
import { studioContext } from '../lib/context/StudioContext';
import { editorStateContext } from '../lib/context/EditorStateContext';
import { serverDocumentsContext } from '../lib/context/ServerDocumentsContext';

const useStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    gap: '1em',
    height: '4rem',
    marginBottom: '.5em',
    padding: '.5em',
    width: '100%',
  },
  toolbarSelectForm: {
    flex: 'auto',
  },
});

const useOverrideStyles = makeStyles({
  root: {
    maxWidth: 'unset',
  },
});

export interface ToolbarProps {
  connected: boolean;
  recreateDialog: () => void;
}

const Toolbar = ({
  connected,
  recreateDialog,
}: ToolbarProps): JSX.Element => {
  const classes = useStyles();
  const overrideClasses = useOverrideStyles();
  const {
    documentIndex,
    resourceIndex,
    setDocumentIndex,
    setResourceIndex,
  } = React.useContext(editorStateContext);
  const {
    files,
    resources,
  } = React.useContext(studioContext);
  const {
    documents,
    saveDocument,
  } = React.useContext(serverDocumentsContext);
  const lrs = useLRS();
  const intl = useIntl();
  const [saving, setSaving] = React.useState(false);

  const stripID = (iri: string): string => iri.split('_libro/docs/').pop()!;

  const showMessage = (msg: string) => lrs.actions.ontola.showSnackbar(msg);

  const handleSave = React.useCallback(async (id: string) => {
    try {
      setSaving(true);
      await saveDocument(id, files);
      await showMessage(intl.formatMessage(studioToolbarMessages.savedNotification));
      setSaving(false);
    } catch(_) {
      await showMessage(intl.formatMessage(studioToolbarMessages.saveFailedNotification));
      setSaving(false);
    }
  }, [setSaving, saveDocument, files]);

  const onSaveAs = React.useCallback(() => {
    const newID = prompt(intl.formatMessage(studioToolbarMessages.saveAsPrompt));

    if (newID === null) {
      return Promise.reject();
    }

    const strippedID = stripID(newID);
    const duplicate = documents?.map(stripID).some((docID) => docID === strippedID);
    const save = !duplicate || confirm(intl.formatMessage(studioToolbarMessages.override, { docID: documents?.[documentIndex] }));

    if (!save) {
      return Promise.reject();
    }

    return handleSave(strippedID);
  }, [documents, handleSave]);

  const onSave = React.useCallback(() => {
    if (documents && documents.length > 0) {
      const overwrite = confirm(intl.formatMessage(studioToolbarMessages.override, { docID: documents?.[documentIndex] }));

      if (!overwrite) {
        return Promise.resolve();
      }

      const id = stripID(documents?.[documentIndex]);

      return handleSave(id);
    }

    return onSaveAs();
  }, [onSaveAs]);

  return (
    <Paper
      className={classes.toolbar}
      elevation={3}
    >
      <IconButton
        color="primary"
        onClick={recreateDialog}
      >
        <Badge
          color={connected ? 'primary' : 'secondary'}
          variant="dot"
        >
          <LaunchIcon />
        </Badge>
      </IconButton>
      <FormControl className={classes.toolbarSelectForm}>
        <InputLabel htmlFor="studio-documents">
          {intl.formatMessage(studioToolbarMessages.documentDropdownLabel)}
        </InputLabel>
        <Select
          autoWidth
          labelId="studio-documents"
          value={documentIndex}
          onChange={(e) => setDocumentIndex(Number(e.target.value))}
        >
          {documents?.map((document, i) => (
            <MenuItem
              classes={overrideClasses}
              key={document}
              value={i}
            >
              {document}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.toolbarSelectForm}>
        <InputLabel htmlFor="studio-resource">
          {intl.formatMessage(studioToolbarMessages.resourceDropdownLabel, {
            current: resourceIndex + 1,
            total: resources.length,
          })}
        </InputLabel>
        <Select
          autoWidth
          labelId="studio-resource"
          value={resourceIndex}
          onChange={(e) => setResourceIndex(Number(e.target.value))}
        >
          <MenuItem
            classes={overrideClasses}
            key="auto"
            value="-1"
          >
            Auto
          </MenuItem>
          {resources.map((resource, i) => (
            <MenuItem
              classes={overrideClasses}
              key={resource.value}
              value={i}
            >
              {resource.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        disabled={saving}
        startIcon={<FontAwesome name="save" />}
        variant="outlined"
        onClick={onSave}
      >
        {intl.formatMessage(studioToolbarMessages.saveButtonLabel)}
      </Button>
      <Button
        disabled={saving}
        startIcon={<FontAwesome name="save" />}
        variant="outlined"
        onClick={onSaveAs}
      >
        {intl.formatMessage(studioToolbarMessages.saveAsButtonLabel)}
      </Button>
    </Paper>
  );
};

export default Toolbar;
