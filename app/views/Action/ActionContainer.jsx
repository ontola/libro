import schema from '@ontologies/schema';
import {
  Resource,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { containerTopology } from '../../topologies/Container';

import NavigatableAction from './NavigatableAction';

class ActionContainer extends NavigatableAction {
  static type = schema.Action;

  static topology = [
    containerTopology,
  ];

  static mapDataToProps = {
    actionStatus: schema.actionStatus,
    target: schema.target,
  };

  static hocs = [withRouter];

  static propTypes = {
    navigate: PropTypes.func,
    subject: subjectType,
  };

  render() {
    const {
      actionStatus,
      subject,
      target,
    } = this.props;

    if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
      return null;
    }

    return (
      <Resource
        action={subject}
        subject={target}
        onDone={this.onDoneHandler}
      />
    );
  }
}

export default register(ActionContainer);
