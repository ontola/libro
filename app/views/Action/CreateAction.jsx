import {
  Property,
  linkType,
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
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { alertDialogTopology } from '../../topologies/Dialog';
import { gridTopology } from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import { pageTopology } from '../../topologies/Page';

const propTypes = {
};

export class CreateActionButton extends Component {
  static type = NS.schema('CreateAction');

  static topology = allTopologiesExcept(
    undefined,
    actionsBarTopology,
    alertDialogTopology,
    cardListTopology,
    cardFloatTopology,
    containerFloatTopology,
    gridTopology,
    pageTopology,
    tabPaneTopology,
    tableCellTopology,
    tableRowTopology,
    widgetTopologyTopology
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
