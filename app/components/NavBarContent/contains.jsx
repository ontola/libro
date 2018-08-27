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

import { NS } from '../../helpers/LinkedRenderStore';
import { setOrganization } from '../../state/app/actions';
import { getOrganization } from '../../state/app/selectors';
import LDLink from '../LDLink';
import SideBarCollapsibleDefault from '../SideBarCollapsible';

const propTypes = {
  contains: linkedPropType,
  lastOrganization: linkedPropType,
  subject: subjectType,
};

class Contains extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.linkVersion !== nextProps.linkVersion
      || this.props.lastOrganization !== nextProps.lastOrganization;
  }

  currentOrg() {
    const { lastOrganization, contains } = this.props;

    if (contains && this.props.lrs.tryEntity(contains)) {
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
        <SideBarCollapsibleDefault
          id={`${this.props.subject}-menu-items`}
          labelComp={label}
        >
          <LinkedResourceContainer subject={NS.app('menus/organizations')}>
            <Property label={NS.argu('menuItems')} />
          </LinkedResourceContainer>
        </SideBarCollapsibleDefault>
      </div>
    );
  }

  render() {
    const { contains, reloadLinkedObject } = this.props;

    const status = this.props.lrs.api.getStatus(this.props.subject);
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
          <Type reloadLinkedObject={reloadLinkedObject} />
          <Property forceRender label={NS.argu('baseColor')} />
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
