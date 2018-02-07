import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  Type,
  linkedPropType,
  lowLevel,
  subjectType,
} from 'link-redux';
import React, { Component } from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
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
          <LinkedResourceContainer subject={NS.app('menus/organizations')} />
        </SideBarCollapsible>
      </div>
    );
  }

  render() {
    const { currentOrg } = this.state;

    if (currentOrg) {
      return (
        <LinkedResourceContainer
          forceRender
          subject={currentOrg}
        >
          {this.navbarSwitcher()}
          <Type />
          <Property label={NS.argu('baseColor')} />
        </LinkedResourceContainer>
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
  lowLevel.linkedSubject(lowLevel.linkedVersion(Contains)),
  [NS.schema('Thing'), NS.link('Document')],
  NS.argu('contains'),
  NS.argu('sidebarBlock')
);
