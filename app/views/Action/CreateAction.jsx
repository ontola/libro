import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  linkType,
  Property,
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
  actionStatus: linkType,
  children: PropTypes.element,
};

export class CreateActionButton extends Component {
  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <LDLink disabled={!!this.props.actionStatus}>
        <Property label={NS.schema('name')} />
      </LDLink>
    );
  }
}

CreateActionButton.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  CreateActionButton,
  NS.schema('CreateAction'),
  RENDER_CLASS_NAME,
  allTopologiesExcept(
    actionsBarTopology,
    alertDialogTopology,
    cardListTopology,
    cardFloatTopology,
    tabPaneTopology
  )
);
