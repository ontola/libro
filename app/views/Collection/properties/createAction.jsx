import as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { NS } from '../../../helpers/LinkedRenderStore';

class CreateAction extends React.PureComponent {
  static type = as.Collection;

  static property = NS.ontola('createAction');

  static topology = actionsBarTopology;

  static mapDataToProps = {
    createAction: NS.ontola('createAction'),
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
      <LinkedResourceContainer
        count={this.props.totalItems}
        isPartOf={this.props.isPartOf}
        omniform={this.props.omniform}
        subject={this.props.createAction}
      />
    );
  }
}

export default register(CreateAction);
