import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { filterFind } from '../../helpers/data';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

const InlineCreateAction = ({
  actionStatus,
  count,
  omniform,
  onClick,
  subject,
}) => {
  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <Property
      count={count}
      label={schema.name}
      onClick={omniform && OMNIFORM_FILTER.find(filterFind(subject)) ? onClick : undefined}
    />
  );
};

InlineCreateAction.type = schema.CreateAction;

InlineCreateAction.topology = [
  actionsBarTopology,
  cardFloatTopology,
  cardListTopology,
];

InlineCreateAction.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
};

InlineCreateAction.hocs = [
  connect(null, mapCardListDispatchToProps),
];

InlineCreateAction.propTypes = {
  actionStatus: linkType,
  count: linkType,
  omniform: PropTypes.bool,
  onClick: PropTypes.func,
  subject: subjectType,
};

export default register(InlineCreateAction);
