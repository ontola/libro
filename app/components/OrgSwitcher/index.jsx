import React, { PropTypes } from 'react';

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
      className="OrgSwitcher__image"
      role="Presentation"
      src={imageUrl}
    />
    <span className="OrgSwitcher__name">{name}</span>
  </div>
);

OrgSwitcher.propTypes = propTypes;

export default OrgSwitcher;
