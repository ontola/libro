import LinkedRenderStore from 'link-lib';
import {
  LinkedObjectContainer,
  Property,
  Type,
  linkedPropType,
  subjectType,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React, { Component } from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';
import {
  LDLink,
  SideBarCollapsible,
} from '../../../components';

const propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

class Contains extends Component {
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

  navbarSwitcher() {
    const label = (
      <LDLink>
        <Property label={NS.schema('name')} />
      </LDLink>
    );

    return (
      <div className="NavBarContent__switcher">
        <SideBarCollapsible
          id={`${this.props.subject}-menu-items`}
          labelComp={label}
        >
          <LinkedObjectContainer object={`${FRONTEND_URL}/menus/organizations`} />
        </SideBarCollapsible>
      </div>
    );
  }

  render() {
    const { currentOrg } = this.state;

    if (currentOrg) {
      return (
        <LinkedObjectContainer
          forceRender
          object={currentOrg}
        >
          {this.navbarSwitcher()}
          <Type />
          <Property label={NS.argu('baseColor')} />
        </LinkedObjectContainer>
      );
    }

    return (
      <div>
        {this.navbarSwitcher()}
      </div>
    );
  }
}

Contains.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Contains,
  [NS.schema('Thing'), new NamedNode('http://www.w3.org/2007/ont/link#Document')],
  NS.argu('contains'),
  NS.argu('sidebarBlock')
);
