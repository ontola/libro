import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Link from '../Link';

const propTypes = {
  children: PropTypes.node,
  features: PropTypes.arrayOf(
    PropTypes.oneOf([
      'padded',
    ])
  ),
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
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
      ref,
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

    return (
      <Link
        activeClassName="NavbarLink--active"
        allowExternal={false}
        className="NavbarLink__link"
        features={features}
        isIndex={isIndex}
        ref={ref}
        target={target}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
}

NavbarLinkLink.propTypes = propTypes;

export default NavbarLinkLink;
