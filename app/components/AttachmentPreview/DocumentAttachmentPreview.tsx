import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../themes/themes';
import Image from '../Image';

const ATTACHMENT_PREVIEW_IMAGE_SPACING = 3;

export interface DocumentAttachmentPreviewProps {
  downloadURL: string;
  label?: string;
  showPreviewDialog: boolean;
  thumbnailURL: SomeTerm;
  onPreviewClick: React.MouseEventHandler;
}

export interface FileNameFallbackProps {
  downloadURL: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  attachmentPreview: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey['400']}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    height: '40px',
    marginBottom: '1rem',
    marginRight: '.5em',
    minWidth: '100%',
    outline: 'none',
    width: '100%',
  },

  attachmentPreviewImage: {
    color: theme.palette.primary.main,
    fontSize: '20px !important',
    height: '100%',
    paddingLeft: theme.spacing(ATTACHMENT_PREVIEW_IMAGE_SPACING),
    paddingRight: theme.spacing(ATTACHMENT_PREVIEW_IMAGE_SPACING),
  },

  attachmentPreviewTitle: {
    '&:hover': {
      textDecoration: 'underline',
    },

    alignItems: 'center',
    color: `${theme.palette.text.primary} !important`,
    cursor: 'pointer',
    display: 'inline-flex',
    flexGrow: 1,
    fontSize: '.8rem',
    height: '100%',
    overflow: 'hidden',
    paddingRight: '2px',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  centerIcon: {
    alignItems: 'center',
    display: 'inline-flex !important',
    flexDirection: 'row',
  },

  downloadButton: {
    '&:hover': {
      color: `${theme.palette.primary.main} !important`,
    },

    borderLeft: `1px solid ${theme.palette.grey['400']}`,
    color: `${theme.palette.grey['600']} !important`,
    cursor: 'pointer',
    fontSize: '20px !important',
    height: '100%',
    padding: '7px',
  },
}));

const FileNameFallback = ({ downloadURL }: FileNameFallbackProps) => {
  const [fileName, setFileName] = React.useState(downloadURL.replace('content/content', ''));

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(downloadURL, { signal }).then((res) => {
      abortController.abort();

      const url = new URL(res.url);
      const resolvedName = url.pathname.split('/').pop();
      resolvedName && setFileName(resolvedName);
    });
  }, [downloadURL]);

  return <React.Fragment>{fileName}</React.Fragment>;
};

export const DocumentAttachmentPreview = ({
  downloadURL,
  label,
  showPreviewDialog,
  thumbnailURL,
  onPreviewClick,
}: DocumentAttachmentPreviewProps): JSX.Element => {
  const classes = useStyles();

  const renderFileName = () =>
    showPreviewDialog ? (
      <button
        className={classes.attachmentPreviewTitle}
        title={label ?? ''}
        type="button"
        onClick={onPreviewClick}
      >
        {label ?? <FileNameFallback downloadURL={downloadURL} />}
      </button>
    ) : (
      <a
        download
        className={classes.attachmentPreviewTitle}
        href={downloadURL}
        rel="noopener noreferrer"
        target="_blank"
        title={label ?? ''}
      >
        {label ?? <FileNameFallback downloadURL={downloadURL} />}
      </a>
    );

  return (
    <span className={classes.attachmentPreview}>
      <Image
        className={`${classes.attachmentPreviewImage} ${classes.centerIcon}`}
        linkedProp={thumbnailURL}
      />
      {renderFileName()}
      <a
        download
        className={`${classes.downloadButton} ${classes.centerIcon}`}
        href={downloadURL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesome name="download" />
      </a>
    </span>
  );
};
