import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import Heading from '../Heading';

import './ProfileListItem.scss';

const propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const ProfileListItem = ({
  image,
  link,
  name,
  description,
}) => (
  <div className="ProfileListItem">
    <Link
      className="ProfileListItem__link"
      to={link}
    >
      <div className="ProfileListItem__imagewrapper">
        {image && <img
          alt={name}
          className="ProfileListItem__image"
          src={image}
        />}
      </div>
      <div className="ProfileListItem__name">
        <Heading size="3">
          {name}
        </Heading>
      </div>
      {description &&
        <div className="ProfileListItem__description">
          {description}
        </div>
      }
    </Link>
  </div>
);

ProfileListItem.propTypes = propTypes;

export default ProfileListItem;
