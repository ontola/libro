import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import NavigatableAction from './NavigatableAction';

class Action extends NavigatableAction {
  static type = NS.schema('Action');

  static topology = [
    alertDialogTopology,
    pageTopology,
    primaryResourceTopology,
    tabPaneTopology,
  ];

  static mapDataToProps = [NS.schema('object')];

  static hocs = [withRouter];

  static propTypes = {
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  name() {
    const top = (this.props.topology || this.props.topologyCtx);
    if ([alertDialogTopology, tabPaneTopology].includes(top)) {
      return null;
    }

    return <Property label={NS.schema('name')} />;
  }

  render() {
    return (
      <Container>
        {this.name()}
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
