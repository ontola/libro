import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { permissionMessages } from '../../../../../translations/messages';
import ontola from '../../../../Kernel/ontology/ontola';
import { tableRowTopology } from '../../../../Table/topologies';
import argu from '../../../ontology/argu';

const PermissionTableCell: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const intl = useIntl();
  const [parentType] = useStrings(isNamedNode(linkedProp) ? linkedProp : undefined, ontola.pluralLabel);

  if (!linkedProp) {
    return null;
  }

  const conditional = linkedProp !== schema.Thing;
  const title = conditional && parentType ? intl.formatMessage(permissionMessages.validForType, { parentType }) : undefined;

  return (
    <FontAwesome
      name={conditional ? 'question' : 'check'}
      title={title}
    />
  );
};

PermissionTableCell.type = argu.GrantTreeGroup;

PermissionTableCell.property = [
  argu.createBlogPostPermission,
  argu.createCommentPermission,
  argu.createConArgumentPermission,
  argu.createForumPermission,
  argu.createMotionPermission,
  argu.createPagePermission,
  argu.createProArgumentPermission,
  argu.createQuestionPermission,
  argu.createVotePermission,
  argu.destroyPermission,
  argu.showPermission,
  argu.trashPermission,
  argu.updatePermission,
];

PermissionTableCell.topology = tableRowTopology;

export default register(PermissionTableCell);
