import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { linkType, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const SNACKBAR_TIMEOUT = 2750;

const SnackbarView = ({ close, text }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      action={[
        <IconButton
          aria-label="Close"
          color="inherit"
          href="#"
          key="close"
          title="Sluiten"
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

SnackbarView.type = NS.ontola('snackbar/Snackbar');

SnackbarView.topology = allTopologies;

SnackbarView.mapDataToProps = {
  text: NS.schema('text'),
};

SnackbarView.linkOpts = { returnType: 'value' };

SnackbarView.propTypes = {
  close: PropTypes.func,
  text: linkType,
};


export default [
  register(SnackbarView),
];
