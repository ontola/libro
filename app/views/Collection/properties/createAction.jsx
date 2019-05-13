import { LinkedResourceContainer, linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { NS } from '../../../helpers/LinkedRenderStore';

class CreateAction extends React.PureComponent {
  static type = NS.as('Collection');

  static property = NS.ontola('createAction');

  static topology = actionsBarTopology;

  static mapDataToProps = [
    NS.ontola('createAction'),
    NS.as('totalItems'),
    NS.schema('isPartOf'),
  ];

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
