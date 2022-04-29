import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { SomeTerm } from '@ontologies/core';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import Image from '../Image';

const ATTACHMENT_PREVIEW_TITLE_ALPHA = 0.5;

export interface ImageAttachmentPreviewProps {
  downloadURL?: string;
  label?: string;
  showPreviewDialog?: boolean;
  thumbnailURL: SomeTerm;
  onPreviewClick: React.MouseEventHandler;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  attachmentPreview: {
    '&:hover $attachmentPreviewTitle': {
      display: 'block',
    },

    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.14);',
    cursor: 'pointer',
    display: 'inline-flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    marginRight: '1.5em',
    outline: 'none',
    position: 'relative',
  },

  attachmentPreviewImage: {
    height: '64px',
    width: '64px',
  },

  attachmentPreviewTitle: {
    backgroundColor: alpha(theme.palette.common.black, ATTACHMENT_PREVIEW_TITLE_ALPHA),
    bottom: '0',
    color: theme.palette.common.white,
    display: 'none',
    fontSize: '.8rem',
    left: '0',
    overflow: 'hidden',
    padding: '.1em',
    position: 'absolute',
    right: '0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export const ImageAttachmentPreview = ({
  label,
  thumbnailURL,
  onPreviewClick,
}: ImageAttachmentPreviewProps): JSX.Element => {
  const classes = useStyles();

  return (
    <button
      className={classes.attachmentPreview}
      data-test="ImageAttachmentPreview"
      type="button"
      onClick={onPreviewClick}
    >
      <Image
        className={classes.attachmentPreviewImage}
        linkedProp={thumbnailURL}
      />
      {label && (
        <span
          className={classes.attachmentPreviewTitle}
          title={label}
        >
          {label}
        </span>
      )}
    </button>
  );
};
