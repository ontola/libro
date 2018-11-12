import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import NavigatableAction, { bindNavigateProp } from './NavigatableAction';

class Action extends NavigatableAction {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
    NS.schema('CreateAction'),
    NS.argu('TrashAction'),
    NS.argu('UntrashAction'),
  ];

  static topology = [
    alertDialogTopology,
    pageTopology,
    primaryResourceTopology,
    tabPaneTopology,
  ];

  static mapDataToProps = [NS.schema('object')];

  static hocs = [bindNavigateProp];

  static propTypes = {
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  render() {
    return (
      <Container>
        {(this.props.topology || this.props.topologyCtx) !== alertDialogTopology && <Property label={NS.schema('name')} />}
        <Property
          action={this.props.subject}
          cancelPath={retrievePath(this.props.object.value)}
          label={NS.schema('target')}
          onDone={this.onDoneHandler}
        />
      </Container>
    );
  }
}

export default register(Action);
