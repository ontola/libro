import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  NavBarContent,
} from '../components';
import { getSideBarColor } from '../state/sideBars/selectors';

const propTypes = {
  orgColor: PropTypes.string,
  redirectUrl: PropTypes.string,
  voteMatchCount: PropTypes.number,
};

const NavbarContainer = ({ redirectUrl, orgColor, voteMatchCount }) => (
  <NavBarContent
    orgColor={orgColor}
    redirectUrl={redirectUrl}
    voteMatchCount={voteMatchCount}
  />
);

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    orgColor: getSideBarColor(state),
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(NavbarContainer);
