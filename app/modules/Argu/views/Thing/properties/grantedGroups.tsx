import { NamedNode, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  register,
  useDataFetching,
  useStrings, 
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { allTopologiesExcept } from '../../../../../topologies';
import Detail from '../../../../Common/components/Detail';
import { LoadingDetail } from '../../../../Common/components/Loading';
import { contentDetailsTopology, detailsBarTopology } from '../../../../Common/topologies';
import ContentDetails from '../../../../Common/topologies/ContentDetails';
import { useContainerToArr } from '../../../../Kernel/hooks/useContainerToArr';
import { grantedGroupMessages } from '../../../lib/messages';
import argu from '../../../ontology/argu';

const publicGroupID = '/g/-1';

const GrantedGroupsDetail: FC<PropertyProps> = ({ linkedProp }) => {
  const { formatMessage } = useIntl();
  useDataFetching(isNamedNode(linkedProp) ? linkedProp : []);
  const [groups, groupsLoading] = useContainerToArr<NamedNode>(isNamedNode(linkedProp) ? linkedProp : undefined);
  useDataFetching(groups);
  const groupNames = useStrings(groups, schema.name).filter(Boolean).join(', ');

  if (groupsLoading) {
    return <LoadingDetail />;
  }

  if (groups.findIndex((g) => g.value.endsWith(publicGroupID)) === -1) {
    return (
      <Detail
        icon="group"
        text={formatMessage(grantedGroupMessages.privateText)}
        title={formatMessage(grantedGroupMessages.privateTitle, { groupNames })}
      />
    );
  }

  return (
    <Detail
      icon="globe"
      text={formatMessage(grantedGroupMessages.publicText)}
      title={formatMessage(grantedGroupMessages.publicTitle)}
    />
  );
};

GrantedGroupsDetail.type = schema.Thing;

GrantedGroupsDetail.topology = [detailsBarTopology, contentDetailsTopology];

GrantedGroupsDetail.property = argu.grantedGroups;

const GrantedGroups = () => (
  <ContentDetails>
    <Property label={argu.grantedGroups} />
  </ContentDetails>
);

GrantedGroups.type = schema.Thing;

GrantedGroups.topology = allTopologiesExcept(detailsBarTopology, contentDetailsTopology);

GrantedGroups.property = argu.grantedGroups;

GrantedGroups.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

export default [
  ...register(GrantedGroups),
  ...register(GrantedGroupsDetail),
];
