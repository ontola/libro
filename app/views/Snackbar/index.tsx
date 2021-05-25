import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as schema from '@ontologies/schema';
import {
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { formMessages } from '../../translations/messages';

const AVERAGE_DUTCH_WORDS_PER_MINUTE = 202;
const MIN_SNACKBAR_TIMEOUT = 2750;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

interface SnackbarViewProps {
  close: () => void;
  text: string;
}

const calcDuration = (text = '') => {
  const avgWPS = AVERAGE_DUTCH_WORDS_PER_MINUTE / SECONDS_IN_MINUTE;
  const wordAmount = text.split(/\b/)
    .map((x) => x.trim())
    .filter(Boolean)
    .length;

  const duration = Math.round(wordAmount / avgWPS) * MILLISECONDS_IN_SECOND;

  return Math.max(MIN_SNACKBAR_TIMEOUT, duration);
};

const SnackbarView = ({ close, text }: SnackbarViewProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      action={[
        <IconButton
          aria-label={formatMessage(formMessages.close)}
          color="inherit"
          href="#"
          key="close"
          title={formatMessage(formMessages.close)}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      autoHideDuration={calcDuration(text)}
      message={text}
      open={open}
      onClose={handleClose}
      onExited={close}
    />
  );
};

SnackbarView.type = ontola.ns('snackbar/Snackbar');

SnackbarView.topology = allTopologies;

SnackbarView.mapDataToProps = {
  text: schema.text,
};

SnackbarView.linkOpts = { returnType: ReturnType.Value };

export default [
  register(SnackbarView),
];
