import './ProfileListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Heading } from 'components';

const propTypes = {
  image: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const ProfileListItem = ({
  image,
  link,
  name,
  description,
}) => (
  <div className="ProfileListItem">
    <Link
      to={link}
      className="ProfileListItem__link"
    >
      <div className="ProfileListItem__imagewrapper">
        {image && <img
          src={image}
          alt={name}
          className="ProfileListItem__image"
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
