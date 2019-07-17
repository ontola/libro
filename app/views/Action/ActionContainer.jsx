import {
  LinkedResourceContainer,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';

import NavigatableAction from './NavigatableAction';

class ActionContainer extends NavigatableAction {
  static type = NS.schema('Action');

  static topology = [
    containerTopology,
  ];

  static mapDataToProps = [
    NS.schema('actionStatus'),
    NS.schema('target'),
  ];

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

    if (actionStatus && actionStatus !== NS.schema('PotentialActionStatus')) {
      return null;
    }

    return (
      <LinkedResourceContainer
        action={subject}
        subject={target}
        onDone={this.onDoneHandler}
      />
    );
  }
}

export default register(ActionContainer);
