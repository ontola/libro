import HttpStatus from 'http-status-codes';
import { defaultNS } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  Type,
  link,
  linkedPropType,
  subjectType,
  PropertyBase,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import {
  LDLink,
  SideBarCollapsible,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { setOrganization } from '../../state/app/actions';
import { getOrganization } from '../../state/app/selectors';

const propTypes = {
  contains: linkedPropType,
  lastOrganization: linkedPropType,
  subject: subjectType,
};

class Contains extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.version !== nextProps.version
      || this.props.lastOrganization !== nextProps.lastOrganization;
  }

  currentOrg() {
    const { lastOrganization, contains } = this.props;

    if (contains && this.context.linkedRenderStore.tryEntity(contains)) {
      return contains;
    }

    return lastOrganization;
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
    const { contains } = this.props;

    const status = this.context.linkedRenderStore.api.getStatus(this.props.subject);
    if (status.requested === true && status.status === HttpStatus.OK) {
      this.props.onOrganizationChange(contains);
    }

    const currentOrg = this.currentOrg();

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

const mapStateToProps = state => ({
  lastOrganization: getOrganization(state),
});

const mapDispatchToProps = dispatch => ({
  onOrganizationChange: iri => dispatch(setOrganization(iri)),
});

export default link(
  [defaultNS.argu('contains')],
  { forceRender: true }
)(connect(mapStateToProps, mapDispatchToProps)(Contains));
