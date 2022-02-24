import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import HttpStatus from 'http-status-codes';
import React from 'react';

import Heading, { HeadingSize } from '../../components/Heading';
import DownloadSection from '../../components/MediaViewer/DownloadSection';
import { MediaViewerProps } from '../../components/MediaViewer/MediaViewer';
import { Margin } from '../../themes/themes';

import { useParseTabular } from './useParseTabular';

const useStyles = makeStyles((theme) => ({
  mediaObjectPageInfoBarImage: {
    '&.fa': {
      fontSize: '10em',
    },
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    textAlign: 'center',
  },

  mediaObjectPageInfoBarImageFilename: {
    textAlign: 'center',
  },
  previewHeading: {
    margin: theme.spacing(Margin.Medium, 0),
  },
}));

const SheetViewer = (props: MediaViewerProps): JSX.Element => {
  const {
    contentUrl,
    downloadSection,
  } = props;
  const classes = useStyles();

  const [file, setFile] = React.useState<ArrayBuffer | undefined>();
  const [contentType, setContentType] = React.useState<string | undefined>();
  const [fetchError, setFetchError] = React.useState<string | undefined>();

  const [columns, rows, error] = useParseTabular(contentUrl, contentType, file);

  React.useEffect(() => {
    fetch(contentUrl)
      .then((res) => {
        if (res.status !== HttpStatus.OK) {
          throw new Error(`Error ${res.status}`);
        }

        setContentType(res.headers.get('Content-Type') ?? undefined);

        return res.arrayBuffer();
      })
      .then((buffer) => setFile(buffer))
      .catch((e) => setFetchError(e.message ?? ''));
  }, [contentUrl]);

  return (
    <React.Fragment>
      <Container>
        {downloadSection && <DownloadSection {...props} />}
        <Heading
          className={classes.previewHeading}
          size={HeadingSize.LG}
        >
          Preview
        </Heading>
      </Container>
      <Container>
        <div
          style={{
            height: '50em',
            width: '100%',
          }}
        >
          <DataGrid
            disableColumnMenu
            disableSelectionOnClick
            hideFooterSelectedRowCount
            columns={columns ?? []}
            error={fetchError ?? error}
            loading={!file || !columns || !rows}
            pageSize={100}
            rows={rows ?? []}
            rowsPerPageOptions={[100]}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SheetViewer;
