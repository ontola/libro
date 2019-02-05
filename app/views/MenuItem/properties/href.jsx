import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  NavbarLinkLink,
  NavbarLinkWrapper,
} from '../../../components/NavbarLink';
import { NS } from '../../../helpers/LinkedRenderStore';
import SHACL from '../../../helpers/shacl';
import { navbarTopology } from '../../../topologies/Navbar';

class Href extends React.PureComponent {
  static type = [
    NS.argu('Link'),
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
  ];

  static property = NS.argu('href');

  static topology = navbarTopology;

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
    return !href ? onClickToggle : undefined;
  }

  render() {
    const {
      children,
      handleClick,
      href,
    } = this.props;

    return (
      <NavbarLinkWrapper>
        <NavbarLinkLink
          isIndex
          to={href ? href.value : '#'}
          onClick={handleClick || this.clickHandler()}
        >
          {children}
        </NavbarLinkLink>
      </NavbarLinkWrapper>
    );
  }
}

export default register(Href);
