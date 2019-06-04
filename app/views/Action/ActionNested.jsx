import { Property, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { tabPaneTopology } from '../../topologies/TabPane';

import NavigatableAction from './NavigatableAction';

class ActionNested extends NavigatableAction {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
  ];

  static topology = [
    alertDialogTopology,
    tabPaneTopology,
  ];

  static mapDataToProps = [NS.schema('object')];

  static hocs = [withRouter];

  static propTypes = {
    navigate: PropTypes.func,
    object: subjectType,
    subject: subjectType,
  };

  render() {
    return (
      <Container>
        <CardMain>
          <CardContent>
            <Property label={NS.schema('name')} />
          </CardContent>
          <Property
            header
            action={this.props.subject}
            cancelPath={retrievePath(this.props.object.value)}
            label={NS.schema('target')}
            onDone={this.onDoneHandler}
          />
        </CardMain>
      </Container>
    );
  }
}

export default register(ActionNested);
