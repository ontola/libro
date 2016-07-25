// @flow
import './politicianslistitem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Heading } from '../';

const propTypes = {
  data: PropTypes.object.isRequired,
};

const PoliticiansListItem = ({ data }) => {
  const { id, image, name, party } = data;
  return (
    <div
      className="PoliticiansList__item"
    >
      <Link
        to={`/profile/${id}`}
        className="PoliticiansList__link"
      >
        <img
          src={image}
          alt={name}
          className="PoliticiansList__image"
        />
        <Heading
          size="3"
          className="PoliticiansList__title"
          children={name}
        />
        <div>{party}</div>
      </Link>
    </div>
  );
};

PoliticiansListItem.propTypes = propTypes;

export default PoliticiansListItem;
