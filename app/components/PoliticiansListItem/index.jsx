// @flow
import './PoliticiansListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Box, Heading } from 'components';

const propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  party: PropTypes.string,
};

const PoliticiansListItem = ({
  id,
  image,
  name,
  party,
}) => (
  <Box>
    <div className="PoliticiansListItem">
      <Link
        to={`/profile/${id}`}
        className="PoliticiansListItem__link"
      >
        <div className="PoliticiansListItem__imagewrapper">
          <img
            src={image}
            alt={name}
            className="PoliticiansListItem__image"
          />
        </div>
        <div className="PoliticiansListItem__content">
          <Heading
            size="3"
            className="PoliticiansListItem__title"
            children={name}
          />
          <div>{party}</div>
        </div>
      </Link>
    </div>
  </Box>
);

PoliticiansListItem.propTypes = propTypes;

export default PoliticiansListItem;
