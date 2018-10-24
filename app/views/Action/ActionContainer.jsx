import { Property, register, subjectType } from 'link-redux';
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

  static hocs = [bindNavigateProp];

  static propTypes = {
    navigate: PropTypes.func,
    subject: subjectType,
  };

  render() {
    return (
      <Property
        action={this.props.subject}
        label={NS.schema('target')}
        onDone={this.onDoneHandler}
      />
    );
  }
}

export default register(ActionContainer);
