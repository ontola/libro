import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LDLink from '../../components/LDLink';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { menuTopology } from '../../topologies/Menu';
import { pageTopology } from '../../topologies/Page';
import { tabPaneTopology } from '../../topologies/TabPane';
import { tableCellTopology } from '../../topologies/TableCell';
import { tableRowTopology } from '../../topologies/TableRow';

const propTypes = {
};

export class CreateActionButton extends Component {
  static type = schema.CreateAction;

  static topology = allTopologiesExcept(
    undefined,
    actionsBarTopology,
    alertDialogTopology,
    cardListTopology,
    cardFloatTopology,
    cardMainTopology,
    containerFloatTopology,
    gridTopology,
    menuTopology,
    fullResourceTopology,
    pageTopology,
    tabPaneTopology,
    tableCellTopology,
    tableRowTopology
  );

  static mapDataToProps = {
    name: schema.name,
  };

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
        title={this.props.name?.value}
      >
        <Property label={schema.name} />
      </LDLink>
    );
  }
}

CreateActionButton.propTypes = propTypes;

export default register(CreateActionButton);
