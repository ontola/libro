// @flow
import './politiciansList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Heading } from '../';

const propTypes = {
  persons: PropTypes.array,
};

const PoliticiansList = ({ persons }) => (
  <div className="PoliticiansList">
    {persons.map(p => (
      <div
        key={p.id}
        className="PoliticiansList__item"
      >
        <Link
          to={`/profile/${p.id}`}
          className="PoliticiansList__link"
        >
          <img
            src={p.image}
            alt={p.name}
            className="PoliticiansList__image"
          />
          <Heading
            size="3"
            className="PoliticiansList__title"
            children={p.name}
          />
          <div>{p.party}</div>
        </Link>
      </div>
    ))}
  </div>
);

PoliticiansList.propTypes = propTypes;

export default PoliticiansList;
