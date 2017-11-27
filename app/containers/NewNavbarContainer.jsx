import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  NavBarContent,
} from '../components';

const propTypes = {
  redirectUrl: PropTypes.string,
  voteMatchCount: PropTypes.number,
};

const NavbarContainer = ({ redirectUrl, voteMatchCount }) => (
  <NavBarContent
    redirectUrl={redirectUrl}
    voteMatchCount={voteMatchCount}
  />
);

NavbarContainer.propTypes = propTypes;

function mapStateToProps() {
  return {
    redirectUrl: window.location.href,
  };
}

export default connect(mapStateToProps)(NavbarContainer);
