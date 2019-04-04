import PropTypes from 'prop-types';
import React from 'react';

import './UnorderedList.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const UnorderedList = ({ children }) => (
  <ul className="UnorderedList">
    {children}
  </ul>
);

UnorderedList.propTypes = propTypes;

export default UnorderedList;
