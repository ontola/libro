import IconButton from '@mui/material/IconButton';
import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { tableRowTopology } from '../../../../Table/topologies/TableRow';

const DownloadUrl = ({ linkedProp }: PropertyProps) => {
  if (!linkedProp) {
    return null;
  }

  return (
    <IconButton
      href={linkedProp.value}
      size="small"
      target="_blank"
      title="Download"
    >
      <FontAwesome name="download" />
    </IconButton>
  );
};

DownloadUrl.type = schema.Thing;

DownloadUrl.property = schema.downloadUrl;

DownloadUrl.topology = tableRowTopology;

export default register(DownloadUrl);
