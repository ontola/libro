import React, { PropTypes } from 'react';

import { SearchResultItem } from 'components';
import { formatDate } from 'helpers/date';

import * as constants from '../../app/config';

const propTypes = {
  result: PropTypes.object.isRequired,
};

const SearchResultContainer = ({ result }) => {
  const {
    _source: source,
    _score: score,
    _type: type,
    highlight,
  } = result;

  const highlightFields = highlight !== undefined && highlight;
  const data = Object.assign({}, source, highlightFields);
  const content = highlight ? data.text : data.text.toString().substr(0, 300);

  // Temporary helper function to deal with the ID's stored in Jur's PG API
  const fixedId = () => {
    const REMOVE_CHARACTERS_COUNT = 4;
    const withoutApi = source.url.substr(REMOVE_CHARACTERS_COUNT);
    return `${constants.FRONTEND_URL}${withoutApi}`;
  };

  return (
    <SearchResultItem
      classification={data.classification}
      createdAt={formatDate(data.date)}
      id={fixedId()}
      name={data.name}
      score={score}
      type={type}
      submitters={data.submitters}
    >
      {content}
    </SearchResultItem>
  );
};

SearchResultContainer.propTypes = propTypes;

export default SearchResultContainer;
