import rdf, { NamedNode, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  ReturnType,
  register,
  useDataFetching,
  useResourceLinks,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import Detail from '../../../components/Detail';
import { LoadingDetail } from '../../../components/Loading';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import app from '../../../ontology/app';
import argu from '../../../ontology/argu';
import {
  allTopologiesExcept,
  contentDetailsTopology,
  detailsBarTopology,
} from '../../../topologies';
import ContentDetails from '../../../topologies/ContentDetails';
import { grantedGroupMessages } from '../../../translations/messages';

const publicGroupIRI = rdf.id(app.ns('g/-1'));

const GrantedGroupsDetail: FC<PropertyProps> = ({ linkedProp }) => {
  const { formatMessage } = useIntl();
  useDataFetching(isNamedNode(linkedProp) ? linkedProp : []);
  const [groups, groupsLoading] = useContainerToArr<NamedNode>(isNamedNode(linkedProp) ? linkedProp : undefined);
  const groupNames = useResourceLinks(
    groups,
    { name: schema.name },
    { returnType: ReturnType.Value },
  ).map(({ name }) => name)
    .filter(Boolean)
    .join(', ');

  if (groupsLoading) {
    return <LoadingDetail />;
  }

  if (groups.findIndex((g) => rdf.id(g) === publicGroupIRI) === -1) {
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
  register(GrantedGroups),
  register(GrantedGroupsDetail),
];
