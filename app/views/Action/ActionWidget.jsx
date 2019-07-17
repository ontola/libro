import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import Button from '../../components/Button';

class ActionWidget extends Component {
  static type = NS.schema('CreateAction');

  static topology = widgetTopologyTopology;

  static mapDataToProps = [NS.schema('name')];

  static propTypes = {
    children: PropTypes.element,
    name: linkType,
    subject: subjectType,
  };

  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <div>
        <Button
          href={retrievePath(this.props.subject.value)}
          title={this.props.name && this.props.name.toString()}
        >
          {this.props.name.value}
        </Button>
      </div>
    );
  }
}

export default register(ActionWidget);
