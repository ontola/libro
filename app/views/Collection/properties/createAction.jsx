import as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { actionsBarTopology } from '../../../topologies/ActionsBar';

class CreateAction extends React.PureComponent {
  static type = as.Collection;

  static property = ontola.createAction;

  static topology = actionsBarTopology;

  static mapDataToProps = {
    createAction: ontola.createAction,
    isPartOf: schema.isPartOf,
    totalItems: as.totalItems,
  };

  static propTypes = {
    createAction: linkType,
    isPartOf: linkType,
    omniform: PropTypes.bool,
    totalItems: linkType,
  };

  render() {
    return (
      <Resource
        count={this.props.totalItems}
        isPartOf={this.props.isPartOf}
        omniform={this.props.omniform}
        subject={this.props.createAction}
      />
    );
  }
}

export default register(CreateAction);
