import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../themes/themes';

interface Props {
  isDragActive: boolean;
  overlay?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  icon: {
    '&.fa': {
      fontSize: '3rem',
    },
  },
  messages: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: theme.palette.transparent.light85,
    borderStyle: 'dashed',
    borderWidth: '1px',
    bottom: 0,
    left: 0,
    minHeight: '6em',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: theme.zIndexOverlay,
  },
}));

const DropzoneOverlay: React.FC<Props> = ({ isDragActive, overlay }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.messages]: true,
        [classes.overlay]: overlay,
      })}
    >
      <FontAwesome
        className={classes.icon}
        name="cloud-upload"
      />
      {isDragActive
        ? (
          <FormattedMessage
            defaultMessage="Release to select this file"
            id="https://app.argu.co/i18n/forms/dropzone/hoverText"
          />
        )
        : (
          <FormattedMessage
            defaultMessage="Drag & Drop your file here or click to select a file"
            id="https://app.argu.co/i18n/forms/dropzone/passiveText"
          />
        )}
    </div>
  );
};

export default DropzoneOverlay;
