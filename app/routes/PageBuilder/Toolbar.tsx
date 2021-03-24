import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useLRS } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { defineMessages, useIntl } from 'react-intl';

import { builderContext } from './builderContext';

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

const messages = defineMessages({
  documentDropdownLabel: {
    defaultMessage: 'Documents',
    id: 'https://app.argu.co/i18n/pagebuilder/documentDropdownLabel',
  },
  override: {
    defaultMessage: 'Are you sure you want to overwrite:\n{docID}?',
    id: 'https://app.argu.co/i18n/pagebuilder/override',
  },
  resourceDropdownLabel: {
    defaultMessage: 'Resource (selected no {current}/{total})',
    id: 'https://app.argu.co/i18n/pagebuilder/resourceDropdownLabel',
  },
  saveAsButtonLabel: {
    defaultMessage: 'Save As',
    id: 'https://app.argu.co/i18n/pagebuilder/saveAsButtonLabel',
  },
  saveAsPrompt: {
    defaultMessage: 'Save document as:',
    id: 'https://app.argu.co/i18n/pagebuilder/saveAsPrompt',
  },
  saveButtonLabel: {
    defaultMessage: 'Save',
    id: 'https://app.argu.co/i18n/pagebuilder/saveButtonLabel',
  },
  savedNotification: {
    defaultMessage: 'Document saved.',
    id: 'https://app.argu.co/i18n/pagebuilder/savedNotification',
  },
});

const Toolbar: React.FC = () => {
  const classes = useStyles();
  const overrideClasses = useOverrideStyles();
  const {
    documentIndex,
    resourceIndex,
    documents,
    resources,
    setDocumentIndex,
    setResourceIndex,
    showEditor,
    setShowEditor,
    saveDocument,
  } = React.useContext(builderContext);
  const lrs = useLRS();
  const intl = useIntl();

  const stripID = (id: string) => id.replace(/^https:\/\/.*\/_libro\/docs\//i, '');

  const showMessage = (msg: string) => lrs.actions.ontola.showSnackbar(msg);

  const onSave = () => {
    if (documents && documents.length > 0) {
      const overwrite = confirm(intl.formatMessage(messages.override, { docID: documents?.[documentIndex] }));

      if (overwrite) {
        const id = stripID(documents?.[documentIndex]);

        saveDocument(id).then(() => {
          showMessage(intl.formatMessage(messages.savedNotification));
        });
      }
    } else {
      onSaveAs();
    }
  };

  const onSaveAs = () => {
    const newID = prompt(intl.formatMessage(messages.saveAsPrompt));

    if (newID === null) {
      return;
    }
    const strippedID = stripID(newID);
    const duplicate = documents?.map(stripID).some((docID) => docID === strippedID);
    const save = !duplicate || confirm(intl.formatMessage(messages.override, { docID: documents?.[documentIndex] }));

    if (save) {
      saveDocument(strippedID).then(() => {
        showMessage(intl.formatMessage(messages.savedNotification));
      });
    }
  };

  return (
    <Paper className={classes.toolbar} elevation={3}>
      <IconButton
        color="primary"
        onClick={() => setShowEditor(!showEditor)}
      >
        {showEditor ? <FontAwesome name="eye" /> : <FontAwesome name="eye-slash" />}
      </IconButton>
      <FormControl className={classes.toolbarSelectForm}>
        <InputLabel htmlFor="pagebuilder-documents">
          {intl.formatMessage(messages.documentDropdownLabel)}
        </InputLabel>
        <Select
          autoWidth
          labelId="pagebuilder-documents"
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
        <InputLabel htmlFor="pagebuilder-resource">
          {intl.formatMessage(messages.resourceDropdownLabel, {
            current: resourceIndex + 1,
            total: resources.length,
          })}
        </InputLabel>
        <Select
          autoWidth
          labelId="pagebuilder-resource"
          value={resourceIndex}
          onChange={(e) => setResourceIndex(Number(e.target.value))}
        >
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
        startIcon={<FontAwesome name="save" />}
        variant="outlined"
        onClick={onSave}
      >
        {intl.formatMessage(messages.saveButtonLabel)}
      </Button>
      <Button
        startIcon={<FontAwesome name="save" />}
        variant="outlined"
        onClick={onSaveAs}
      >
        {intl.formatMessage(messages.saveAsButtonLabel)}
      </Button>
    </Paper>
  );
};

export default Toolbar;
