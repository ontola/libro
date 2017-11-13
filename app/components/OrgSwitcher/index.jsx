import PropTypes from 'prop-types';
import React from 'react';

import './OrgSwitcher.scss';

const propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
};

const OrgSwitcher = ({
  imageUrl,
  name,
}) => (
  <div className="OrgSwitcher">
    <img
      alt=""
      className="OrgSwitcher__image"
      src={imageUrl}
    />
    <span className="OrgSwitcher__name">{name}</span>
  </div>
);

OrgSwitcher.propTypes = propTypes;

export default OrgSwitcher;
