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
import { useIntl } from 'react-intl';

import { LIBRO_THEMES } from '../../themes/LibroThemes';
import { pageBuilderToolbarMessages } from '../../translations/messages';

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
    setTheme,
    saveDocument,
    theme,
  } = React.useContext(builderContext);
  const lrs = useLRS();
  const intl = useIntl();
  const [saving, setSaving] = React.useState(false);

  const stripID = (iri: string): string => iri.split('_libro/docs/').pop()!;

  const showMessage = (msg: string) => lrs.actions.ontola.showSnackbar(msg);

  const handleSave = async (id: string) => {
    setSaving(true);
    try {
      await saveDocument(id);
      await showMessage(intl.formatMessage(pageBuilderToolbarMessages.savedNotification));
      setSaving(false);
    } catch(_) {
      await showMessage(intl.formatMessage(pageBuilderToolbarMessages.saveFailedNotification));
      setSaving(false);
    }
  };

  const onSave = () => {
    if (documents && documents.length > 0) {
      const overwrite = confirm(intl.formatMessage(pageBuilderToolbarMessages.override, { docID: documents?.[documentIndex] }));

      if (!overwrite) {
        return Promise.resolve();
      }

      const id = stripID(documents?.[documentIndex]);

      return handleSave(id);
    }

    return onSaveAs();
  };

  const onSaveAs = () => {
    const newID = prompt(intl.formatMessage(pageBuilderToolbarMessages.saveAsPrompt));

    if (newID === null) {
      return Promise.reject();
    }
    const strippedID = stripID(newID);
    const duplicate = documents?.map(stripID).some((docID) => docID === strippedID);
    const save = !duplicate || confirm(intl.formatMessage(pageBuilderToolbarMessages.override, { docID: documents?.[documentIndex] }));

    if (!save) {
      return Promise.reject();
    }

    return handleSave(strippedID);
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
          {intl.formatMessage(pageBuilderToolbarMessages.documentDropdownLabel)}
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
          {intl.formatMessage(pageBuilderToolbarMessages.resourceDropdownLabel, {
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
      <FormControl className={classes.toolbarSelectForm}>
        <InputLabel htmlFor="theme-select">
          {intl.formatMessage(pageBuilderToolbarMessages.themeDropdownLabel)}
        </InputLabel>
        <Select
          autoWidth
          labelId="theme-select"
          value={theme}
          onChange={(e) => setTheme(`${e.target.value}`)}
        >
          {Object.values(LIBRO_THEMES).map((themeName) => (
            <MenuItem
              classes={overrideClasses}
              key={themeName}
              value={themeName}
            >
              {themeName}
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
        {intl.formatMessage(pageBuilderToolbarMessages.saveButtonLabel)}
      </Button>
      <Button
        disabled={saving}
        startIcon={<FontAwesome name="save" />}
        variant="outlined"
        onClick={onSaveAs}
      >
        {intl.formatMessage(pageBuilderToolbarMessages.saveAsButtonLabel)}
      </Button>
    </Paper>
  );
};

export default Toolbar;
