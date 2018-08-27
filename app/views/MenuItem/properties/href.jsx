import LinkedRenderStore from 'link-lib';
import {
  link,
  linkedPropType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  SideBarLinkLink,
  SideBarLinkWrapper,
} from '../../../components/SideBarLink';
import { retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  action: linkedPropType,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  href: linkedPropType,
  lrs: lrsType,
  subject: subjectType,
};

const Href = ({
  action,
  children,
  handleClick,
  href,
  lrs,
  subject,
}) => {
  let hrefInner = children;
  if (href) {
    hrefInner = (
      <SideBarLinkLink
        to={!action && retrievePath(href.value)}
        onClick={handleClick || (action && (() => lrs.exec(action, subject)))}
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
};

Href.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('action'), NS.argu('href')])(Href),
  [NS.argu('Link'), NS.argu('MenuItem'), NS.argu('SubMenu')],
  NS.argu('href'),
  NS.argu('sidebar')
);
