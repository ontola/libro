import { LinkedResourceContainer, register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';

import NavigatableAction, { bindNavigateProp } from './NavigatableAction';

class ActionContainer extends NavigatableAction {
  static type = [
    NS.schema('Action'),
    NS.schema('UpdateAction'),
    NS.schema('CreateAction'),
    NS.argu('TrashAction'),
    NS.argu('UntrashAction'),
  ];

  static topology = [
    containerTopology,
  ];

  static mapDataToProps = [
    NS.schema('actionStatus'),
    NS.schema('target'),
  ];

  static hocs = [bindNavigateProp];

  static propTypes = {
    navigate: PropTypes.func,
    subject: subjectType,
  };

  render() {
    const { actionStatus, subject, target } = this.props;

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
