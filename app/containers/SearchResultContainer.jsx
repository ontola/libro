import PropTypes from 'prop-types';
import React from 'react';

import * as constants from "../config";
import { SearchResultItem } from '../components';

const propTypes = {
  result: PropTypes.shape({
    _score: PropTypes.string,
    _source: PropTypes.string,
    _type: PropTypes.string,
    highlight: PropTypes.shape({
      classification: PropTypes.string,
      date: PropTypes.string,
      name: PropTypes.string,
      submitters: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

const PREVIEW_LENGTH = 300;
const REMOVE_CHARACTERS_COUNT = 4;

const SearchResultContainer = ({ result }) => {
  const {
    _source: source,
    _score: score,
    _type: type,
    highlight,
  } = result;

  const highlightFields = highlight !== undefined && highlight;
  const data = Object.assign({}, source, highlightFields);
  const content = highlight ? data.text : data.text.toString().substr(0, PREVIEW_LENGTH);

  // Temporary helper function to deal with the ID's stored in Jur's PG API
  const fixedId = () => {
    const withoutApi = source.url.substr(REMOVE_CHARACTERS_COUNT);
    return `${constants.FRONTEND_URL}${withoutApi}`;
  };

  return (
    <SearchResultItem
      classification={data.classification}
      createdAt={new Date(data.date)}
      id={fixedId()}
      name={data.name}
      score={score}
      submitters={data.submitters}
      type={type}
    >
      {content}
    </SearchResultItem>
  );
};

SearchResultContainer.propTypes = propTypes;

export default SearchResultContainer;
