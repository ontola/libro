/**
 * The `ReactCollapse` module uses a lot of DOM API's (e.g. `clientHeight`) which are not compatible
 * with the snapshot testing system. We also avoid the need of mounting the collapsible reducer by
 * always rendering the children.
 * @module ReactCollapse
 */

import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

export const Collapse = ({ children }) => React.createElement('div', null, children);

Collapse.propTypes = propTypes;

export default Collapse;
