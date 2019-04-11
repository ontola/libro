import { History } from 'history';
import {
  linkType,
  lrsType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import SHACL from '../../helpers/shacl';
import { actionsBarTopology } from '../../topologies/ActionsBar';

class ActionActionsBar extends PureComponent {
  static type = NS.schema('Action');

  static topology = actionsBarTopology;

  static mapDataToProps = [NS.schema('object')];

  static hocs = [withRouter];

  static propTypes = {
    history: PropTypes.instanceOf(History),
    lrs: lrsType,
    object: linkType,
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
    const {
      history,
      object,
      subject,
    } = this.props;
    return (
      <Property
        action={subject}
        label={NS.schema('target')}
        onClick={this.exec}
        onDone={() => history.push(retrievePath(object.value))}
      />
    );
  }
}

export default register(ActionActionsBar);
