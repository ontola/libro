import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { ReturnType, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { formMessages } from '../../translations/messages';

const AVERAGE_DUTCH_WORDS_PER_MINUTE = 60;
const MIN_SNACKBAR_TIMEOUT = 2750;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

export enum Severity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

interface CloseButtonProps {
  onClick: () => void;
}

interface SnackbarViewProps {
  close: () => void;
  severity?: Severity;
  text: string;
}

const useStyles = makeStyles({
  alert: {
    alignItems: 'center',
  },
});

const calcDuration = (text = '') => {
  const avgWPS = AVERAGE_DUTCH_WORDS_PER_MINUTE / SECONDS_IN_MINUTE;
  const wordAmount = text.split(/\b/)
    .map((x) => x.trim())
    .filter(Boolean)
    .length;

  const duration = Math.round(wordAmount / avgWPS) * MILLISECONDS_IN_SECOND;

  return Math.max(MIN_SNACKBAR_TIMEOUT, duration);
};

const CloseButton = ({ onClick }: CloseButtonProps) => {
  const intl = useIntl();

  return (
    <IconButton
      aria-label={intl.formatMessage(formMessages.close)}
      color="inherit"
      href="#"
      title={intl.formatMessage(formMessages.close)}
      onClick={onClick}
    >
      <CloseIcon />
    </IconButton>);
};

const SnackbarView = ({
  close,
  severity,
  text,
}: SnackbarViewProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      action={[
        <CloseButton key="close" onClick={handleClose} />,
      ]}
      autoHideDuration={calcDuration(text)}
      message={text}
      open={open}
      onClose={handleClose}
      onExited={close}
    >
      {severity
        ? (
          <Alert
            action={<CloseButton key="close" onClick={handleClose} />}
            className={classes.alert}
            severity={severity ?? 'info'}
          >
            {text}
          </Alert>
        )
        : undefined}
    </Snackbar>
  );
};

SnackbarView.type = ontola.ns('snackbar/Snackbar');

SnackbarView.topology = allTopologies;

SnackbarView.mapDataToProps = {
  severity: ontola.ns('snackbar/severity'),
  text: schema.text,
};

SnackbarView.linkOpts = { returnType: ReturnType.Value };

export default [
  register(SnackbarView),
];
