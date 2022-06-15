import Icon from '@mui/material/Icon';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import argu from '../../../ontology/argu';
import { tableRowTopology } from '../../../../../topologies';
import LDLink from '../../../../Common/components/LDLink';
import { LinkTarget } from '../../../../Common/components/Link';

const SubmissionDataTableRow: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <LDLink
    target={LinkTarget.Modal}
    to={linkedProp.value}
  >
    <Icon
      color="inherit"
      fontSize="small"
    >
      <FontAwesome name="list" />
    </Icon>
  </LDLink>
);

SubmissionDataTableRow.type = argu.Submission;

SubmissionDataTableRow.property = argu.submissionData;

SubmissionDataTableRow.topology = tableRowTopology;

export default register(SubmissionDataTableRow);
