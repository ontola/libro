import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const SNACKBAR_TIMEOUT = 2750;

interface SnackbarViewProps {
  close: () => void;
  text: SomeTerm;
}

const messages = {
  close: {
    id: 'https://app.argu.co/i18n/forms/actions/close',
  },
};

const SnackbarView = ({ close, text }: SnackbarViewProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      action={[
        <IconButton
          aria-label={formatMessage(messages.close)}
          color="inherit"
          href="#"
          key="close"
          title={formatMessage(messages.close)}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      autoHideDuration={SNACKBAR_TIMEOUT}
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
