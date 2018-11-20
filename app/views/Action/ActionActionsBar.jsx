import {
  lrsType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import SHACL from '../../helpers/shacl';
import { actionsBarTopology } from '../../topologies/ActionsBar';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDone: () => dispatch(push(retrievePath(ownProps.object.value))),
});

class ActionActionsBar extends PureComponent {
  static type = NS.schema('Action');

  static topology = actionsBarTopology;

  static mapDataToProps = [NS.schema('object')];

  static hocs = [connect(null, mapDispatchToProps)];

  static propTypes = {
    lrs: lrsType,
    onDone: PropTypes.func,
    subject: subjectType,
  };

  constructor(props) {
    super(props);

    this.exec = this.exec.bind(this);
  }

  exec() {
    return this.props.lrs.exec(
      this.props.subject,
      SHACL.actionToObject(this.props.lrs, this.props.subject)
    );
  }

  render() {
    return (
      <Property
        action={this.props.subject}
        label={NS.schema('target')}
        onClick={this.exec}
        onDone={this.props.onDone}
      />
    );
  }
}

export default register(ActionActionsBar);
