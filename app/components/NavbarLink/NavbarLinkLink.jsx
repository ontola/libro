import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Link from '../Link';
import {
  retrievePath,
} from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
  features: PropTypes.arrayOf(
    PropTypes.oneOf([
      'highlighted-darken',
      'highlighted-lighten',
      'padded',
    ])
  ),
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_parent',
    '_top',
    'modal',
  ]),
  to: PropTypes.string,
};

class NavbarLinkLink extends PureComponent {
  render() {
    const {
      children,
      features,
      isIndex,
      onClick,
      target,
      to,
    } = this.props;

    if (to === undefined) {
      return (
        <button
          className="NavbarLink__link"
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    const path = retrievePath(to);

    return (
      <Link
        activeClassName="NavbarLink--active"
        className="NavbarLink__link"
        exact={isIndex}
        features={features}
        target={target}
        to={path}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
}

NavbarLinkLink.propTypes = propTypes;

export default NavbarLinkLink;
