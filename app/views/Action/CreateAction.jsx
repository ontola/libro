import {
  linkType,
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { alertDialogTopology } from '../../topologies/Dialog';
import { tabPaneTopology } from '../../topologies/TabPane';

const propTypes = {
};

export class CreateActionButton extends Component {
  static type = NS.schema('CreateAction');

  static topology = allTopologiesExcept(
    actionsBarTopology,
    alertDialogTopology,
    cardListTopology,
    cardFloatTopology,
    tabPaneTopology
  );

  static mapDataToProps = [NS.schema('name')];

  static propTypes = {
    actionStatus: linkType,
    children: PropTypes.element,
    name: linkType,
  };

  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <LDLink
        disabled={!!this.props.actionStatus}
        title={this.props.name && this.props.name.toString()}
      >
        <Property label={NS.schema('name')} />
      </LDLink>
    );
  }
}

CreateActionButton.propTypes = propTypes;

export default register(CreateActionButton);
