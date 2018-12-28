import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { withSideBarCollapsibleActions } from '../../../components/SideBarCollapsible';
import {
  HeaderLinkLink,
  HeaderLinkWrapper,
} from '../../../components/HeaderLink';
import { NS } from '../../../helpers/LinkedRenderStore';
import SHACL from '../../../helpers/shacl';
import { headerTopology } from '../../../topologies/Header';

class Href extends React.PureComponent {
  static type = [
    NS.argu('Link'),
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
  ];

  static property = NS.argu('href');

  static topology = headerTopology;

  static mapDataToProps = [
    NS.argu('action'),
    NS.argu('href'),
  ];

  static hocs = [withSideBarCollapsibleActions];

  static propTypes = {
    action: linkType,
    children: PropTypes.node,
    handleClick: PropTypes.func,
    href: linkType,
    lrs: lrsType,
    onClickToggle: PropTypes.func,
    subject: subjectType,
  };

  clickHandler() {
    const {
      action,
      href,
      lrs,
      subject,
      onClickToggle,
    } = this.props;

    if (action) {
      return (e) => {
        if (e) {
          e.preventDefault();
        }

        return lrs.exec(action, SHACL.actionToObject(lrs, subject));
      };
    }
    return !href && onClickToggle;
  }

  render() {
    const {
      children,
      handleClick,
      href,
    } = this.props;

    return (
      <HeaderLinkWrapper>
        <HeaderLinkLink
          to={href ? href.value : '#'}
          onClick={handleClick || this.clickHandler()}
        >
          {children}
        </HeaderLinkLink>
      </HeaderLinkWrapper>
    );
  }
}

export default register(Href);
