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
import { bestType } from '../../helpers/data';

class ActionActionsBar extends PureComponent {
  static type = NS.schema('Action');

  static topology = actionsBarTopology;

  static mapDataToProps = {
    object: NS.schema.object,
    type: {
      label: NS.rdf.type,
      limit: Infinity,
    },
  };

  static hocs = [withRouter];

  static propTypes = {
    history: PropTypes.instanceOf(History),
    lrs: lrsType,
    object: linkType,
    subject: subjectType,
    type: linkType,
  };

  constructor(props) {
    super(props);

    this.exec = this.exec.bind(this);
  }

  getVariant() {
    switch (bestType(this.props.type)) {
      case NS.teamGL('ContactedAction'):
        return 'success';
      default:
        return undefined;
    }
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
        variant={this.getVariant()}
        onClick={this.exec}
        onDone={() => history.push(retrievePath(object.value))}
      />
    );
  }
}

export default register(ActionActionsBar);
