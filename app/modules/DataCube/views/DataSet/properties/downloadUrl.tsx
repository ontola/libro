import IconButton from '@mui/material/IconButton';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { cardFloatTopology } from '../../../../Common/topologies';
import datacube from '../../../ontology/datacube';

const DownloadUrl: FC<PropertyProps> = ({ linkedProp }) => (
  <IconButton
    href={linkedProp.value}
    size="small"
    target="_blank"
    title="Download"
  >
    <FontAwesome name="download" />
  </IconButton>
);

DownloadUrl.type = datacube.DataSet;

DownloadUrl.topology = cardFloatTopology;

DownloadUrl.property = schema.downloadUrl;

export default register(DownloadUrl);
