// @flow
import './politiciansList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Heading } from '../';

const propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

const PoliticiansList = (props) => {
  const { data } = props;

  return (
    <div className="PoliticiansList">
      {data.map(p => (
        <div
          key={p.id}
          className="PoliticiansList__item"
        >
          <Link
            to={`/profile/${p.id}`}
            className="PoliticiansList__link"
          >
            <img
              src={p.attributes.image}
              alt={p.attributes.name}
              className="PoliticiansList__image"
            />
            <Heading
              size="3"
              className="PoliticiansList__title"
              children={p.attributes.name}
            />
            <div>{p.attributes.party}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

PoliticiansList.propTypes = propTypes;

export default PoliticiansList;
