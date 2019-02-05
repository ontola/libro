import PropTypes from 'prop-types';
import React from 'react';

import CountBubble from '../CountBubble';

const propTypes = {
  count: PropTypes.number,
};

const NavbarLinkCount = ({ count }) => {
  if (!(count > 0)) {
    return null;
  }

  return (
    <div className="NavbarLink__count-wrapper">
      <CountBubble count={count} />
    </div>
  );
};

NavbarLinkCount.propTypes = propTypes;

export default NavbarLinkCount;
