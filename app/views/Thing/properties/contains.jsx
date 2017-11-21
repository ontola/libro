import { LinkedObjectContainer, Property, Type, linkedPropType } from 'link-redux';
import { NamedNode } from 'rdflib';
import React, { Component } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';

const propTypes = {
  linkedProp: linkedPropType,
};

class Contains extends Component {
  static navbarSwitcher() {
    return (
      <div className="NavBarContent__switcher">
        <LinkedObjectContainer object={`${FRONTEND_URL}/menus/organizations`} />
        <Property label={NS.schema('name')} />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      currentOrg: props.linkedProp,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.linkedProp) {
      this.setState({
        currentOrg: nextProps.linkedProp,
      });
    }
  }

  render() {
    const { currentOrg } = this.state;

    if (currentOrg) {
      return (
        <LinkedObjectContainer
          forceRender
          object={currentOrg}
        >
          {Contains.navbarSwitcher()}
          <Type />
        </LinkedObjectContainer>
      );
    }

    return (
      <div>
        {Contains.navbarSwitcher()}
      </div>
    );
  }
}

Contains.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Contains,
  [NS.schema('Thing'), new NamedNode('http://www.w3.org/2007/ont/link#Document')],
  NS.argu('contains'),
  NS.argu('sidebarBlock')
);

export default Contains;
