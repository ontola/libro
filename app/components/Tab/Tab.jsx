import PropTypes from 'prop-types';
import React from 'react';

import LDLink from '../LDLink';

import './Tab.scss';

const propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
};

/**
 * Component to render a Card button. Uses the Button component under the hood.
 * @returns {component} Component
 */
const Tab = ({
  icon,
  label,
}) => (
  <LDLink className="Tab">
    <div className="Tab__icon">
      {icon}
    </div>
    <div className="Tab__label">
      {label}
    </div>
  </LDLink>
);

Tab.propTypes = propTypes;

export default Tab;
