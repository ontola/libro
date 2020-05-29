import IconButton from '@material-ui/core/IconButton';
import schema from '@ontologies/schema';
import { linkedPropType } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import qb from '../../../../ontology/qb';
import { cardFloatTopology } from '../../../../topologies/Card/CardFloat';

const DownloadUrl = ({ linkedProp }) => (
  <IconButton
    href={linkedProp.value}
    size="small"
    target="_blank"
    title="Download"
  >
    <FontAwesome name="download" />
  </IconButton>
);

DownloadUrl.type = qb.DataSet;

DownloadUrl.topology = cardFloatTopology;

DownloadUrl.property = schema.downloadUrl;

DownloadUrl.propTypes = {
  linkedProp: linkedPropType,
};

export default DownloadUrl;
