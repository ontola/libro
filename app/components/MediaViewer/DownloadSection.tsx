import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { downloadUrl } from '../../helpers/attachments';
import { byteToSize } from '../../helpers/numbers';
import { Margin } from '../../themes/themes';

import { MediaViewerProps } from './MediaViewer';

const useStyles = makeStyles((theme) => ({
  downloadSection: {
    display: 'flex',
  },
  fileInfo: {
    display: 'inline-block',
    margin: theme.spacing(0, Margin.Medium),
  },
  fileName: {
    fontSize: '1.8em',
    fontWeight: 800,
  },
}));

const DownloadSection = ({
  contentUrl,
  contentSize,
  filename,
}: MediaViewerProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.downloadSection}>
      <Button
        color="primary"
        href={downloadUrl(contentUrl)}
        rel="nofollow noindex"
        size="large"
        startIcon={<CloudDownloadIcon />}
        variant="contained"
      >
        Download
      </Button>
      <span className={classes.fileInfo}>
        {filename && (
          <Typography
            className={classes.fileName}
            component="h1"
            variant="body1"
          >
            {filename}
          </Typography>
        )}
        {contentSize && (
          <Typography variant="body2">
            <FormattedNumber
              style="unit"
              unit={byteToSize(contentSize)[1]}
              value={byteToSize(contentSize)[0]}
            />
          </Typography>
        )}
      </span>
    </div>
  );
};

export default DownloadSection;
