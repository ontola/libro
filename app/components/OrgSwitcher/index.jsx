import React, { PropTypes } from 'react';
import './OrgSwitcher.scss';
import {
} from 'components';

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
      role="Presentation"
      className="OrgSwitcher__image"
      src={imageUrl}
    />
    <span className="OrgSwitcher__name">{name}</span>
  </div>
);

OrgSwitcher.propTypes = propTypes;

export default OrgSwitcher;
