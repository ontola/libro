import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  SideBarLinkLink,
  SideBarLinkWrapper,
} from '../../../components/SideBarLink';
import { NS } from '../../../helpers/LinkedRenderStore';
import SHACL from '../../../helpers/shacl';
import { sidebarTopology } from '../../../topologies/Sidebar';

class Href extends React.PureComponent {
  static type = [
    NS.argu('Link'),
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
  ];

  static property = NS.argu('href');

  static topology = sidebarTopology;

  static mapDataToProps = [
    NS.argu('action'),
    NS.argu('href'),
  ];

  static propTypes = {
    action: linkType,
    children: PropTypes.node,
    handleClick: PropTypes.func,
    href: linkType,
    lrs: lrsType,
    subject: subjectType,
  };

  render() {
    const {
      action,
      children,
      handleClick,
      href,
      lrs,
      subject,
    } = this.props;

    let hrefInner = children;
    if (href || action) {
      hrefInner = (
        <SideBarLinkLink
          to={!action ? href.value : '#'}
          onClick={
            handleClick || (action && (() => lrs.exec(action, SHACL.actionToObject(lrs, subject))))
          }
        >
          {children}
        </SideBarLinkLink>
      );
    }

    return (
      <SideBarLinkWrapper>
        {hrefInner}
      </SideBarLinkWrapper>
    );
  }
}

export default register(Href);
