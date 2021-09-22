import { Container } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import HttpStatus from 'http-status-codes';
import React from 'react';

import { SheetViewerProps } from '../../containers/SheetViewer';

import { useParseTabular } from './useParseTabular';

const SheetViewer = ({ url }: SheetViewerProps): JSX.Element => {
  const [file, setFile] = React.useState<ArrayBuffer | undefined>();
  const [contentType, setContentType] = React.useState<string | undefined>();
  const [fetchError, setFetchError] = React.useState<string | undefined>();

  const [columns, rows, error] = useParseTabular(url, contentType, file);

  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status !== HttpStatus.OK) {
          throw new Error(`Error ${res.status}`);
        }

        setContentType(res.headers.get('Content-Type') ?? undefined);

        return res.arrayBuffer();
      })
      .then((buffer) => setFile(buffer))
      .catch((e) => setFetchError(e.message ?? ''));
  }, [url]);

  return (
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
  );
};

export default SheetViewer;
