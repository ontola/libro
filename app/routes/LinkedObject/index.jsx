import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { currentLocation } from '../../helpers/paths';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const LinkedObject = ({ location }) => (
  <LinkedResourceContainer subject={currentLocation(location)} />
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
export { default as LinkPage } from './LinkPage';
