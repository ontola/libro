import {
  Property,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { bestType } from '../../helpers/data';
import { History } from '../../helpers/history';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import SHACL from '../../helpers/shacl';
import { actionsBarTopology } from '../../topologies/ActionsBar';

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
      case NS.teamGL('NotAvailableAction'):
      case NS.teamGL('UnsubscribeAction'):
        return 'error';
      default:
        return undefined;
    }
  }

  exec() {
    const target = this.props.lrs.getResourceProperty(this.props.subject, NS.schema('target'));
    const httpMethod = target && this.props.lrs.getResourceProperty(target, NS.schema.httpMethod);

    if (httpMethod && httpMethod.value === 'GET') {
      return new Promise((resolve) => {
        this.props.lrs.actions.ontola.showDialog(
          this.props.lrs.getResourceProperty(target, NS.schema.url)
        );
        resolve();
      });
    }

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
