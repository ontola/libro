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
import { NS } from '../../helpers/LinkedRenderStore';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { OMNIFORM_FILTER, invalidStatuses } from '../Thing/properties/omniform/helpers';

import mapCardListDispatchToProps from './helpers';

class InlineCreateAction extends React.PureComponent {
  static type = NS.schema('CreateAction');

  static topology = [
    actionsBarTopology,
    cardListTopology,
    cardFloatTopology,
  ];

  static mapDataToProps = [
    NS.schema('object'),
    NS.schema('actionStatus'),
  ];

  static hocs = [connect(null, mapCardListDispatchToProps)];

  static displayName = 'InlineCreateActionButton';

  static propTypes = {
    actionStatus: linkType,
    count: linkType,
    omniform: PropTypes.bool,
    onClick: PropTypes.func,
    subject: subjectType,
  };

  render() {
    const {
      actionStatus,
      count,
      omniform,
      onClick,
      subject,
    } = this.props;

    if (invalidStatuses.includes(actionStatus)) {
      return null;
    }

    return (
      <Property
        count={count}
        label={NS.schema('name')}
        onClick={omniform && OMNIFORM_FILTER.find(filterFind(subject)) ? onClick : undefined}
      />
    );
  }
}

export default register(InlineCreateAction);
