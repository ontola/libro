import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  IconButton,
  Popper,
  Typography,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LaunchIcon from '@material-ui/icons/Launch';
import SaveIcon from '@material-ui/icons/Save';
import { useLRS } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { handle } from '../../../../helpers/logging';
import { studioToolbarMessages } from '../../../../translations/messages';
import {
  DialogType,
  ProjectAction,
  ProjectContext,
  ProjectContextProps,
} from '../context/ProjectContext';
import { savePrerender, saveProject } from '../lib/saveProject';

const TOOLBAR_HEIGHT = 4;
const TOOLBAR_SPACING = 0.5;

export const TOTAL_TOOLBAR_HEIGHT = TOOLBAR_HEIGHT + TOOLBAR_SPACING;

const useStyles = makeStyles({
  popper: {
    zIndex: 1,
  },
  spacer: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    gap: '1em',
    height: `${TOOLBAR_HEIGHT}rem`,
    padding: `${TOOLBAR_SPACING}rem`,
    width: '100%',
  },
  toolbarSelectForm: {
    flex: 'auto',
  },
});

export interface ToolbarProps extends ProjectContextProps {
  connected: boolean;
  recreateDialog: () => void;
}

const Toolbar = ({
  dispatch,
  connected,
  project,
  recreateDialog,
}: ToolbarProps): JSX.Element => {
  const classes = useStyles();
  const lrs = useLRS();
  const intl = useIntl();

  const [saving, setSaving] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const showMessage = (msg: string) => lrs.actions.ontola.showSnackbar(msg);

  const createHandler = (cb: (p: ProjectContext) => Promise<{ iri: string; }>) => async () => {
    try {
      setSaving(true);
      const { iri } = await cb(project);
      dispatch({
        iri,
        type: ProjectAction.UpdateProjectIRI,
      });
      await showMessage(intl.formatMessage(studioToolbarMessages.savedNotification));
      setSaving(false);
    } catch (e) {
      handle(e);
      await showMessage(intl.formatMessage(studioToolbarMessages.saveFailedNotification));
      setSaving(false);
    }
  };

  const openImportDialog = React.useCallback(() => {
    dispatch({
      dialogType: DialogType.Import,
      type: ProjectAction.ShowDialog,
    });
  }, [setSaving, project]);

  const handleSave = React.useCallback(() => {
    createHandler(saveProject)();
    dispatch({
      type: ProjectAction.HashProjectData,
    });
  }, [setSaving, project]);

  const handlePrerender = React.useCallback(() => {
    createHandler(savePrerender)();
  }, [setSaving, project]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper
      className={classes.toolbar}
      elevation={0}
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
      <Typography variant="subtitle1">
        {project.iri}
      </Typography>
      <span className={classes.spacer} />
      <Button
        disabled={saving}
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={openImportDialog}
      >
        {intl.formatMessage(studioToolbarMessages.importButtonLabel)}
      </Button>
      <ButtonGroup
        innerRef={anchorRef}
        variant="contained"
      >
        <Button
          disabled={saving}
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={handleSave}
        >
          {intl.formatMessage(studioToolbarMessages.saveButtonLabel)}
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        disablePortal
        transition
        anchorEl={anchorRef.current}
        className={classes.popper}
        open={open}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom'
                ? 'center top'
                : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Button
                  disabled={saving}
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  onClick={handlePrerender}
                >
                  {intl.formatMessage(studioToolbarMessages.prerenderButtonLabel)}
                </Button>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Button
        variant="outlined"
        onClick={() => dispatch({
          iri: undefined,
          type: ProjectAction.Load,
        })}
      >
        <CloseIcon />
      </Button>
    </Paper>
  );
};

export default Toolbar;
