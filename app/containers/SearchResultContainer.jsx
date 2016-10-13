import React, { PropTypes } from 'react';

import { SearchResultItem } from 'components';
import { formatDate } from 'helpers/date';
import path from 'helpers/paths';

const propTypes = {
  result: PropTypes.object.isRequired,
};

const SearchResultContainer = ({ result }) => {
  const {
    _source: source,
    _score: score,
    highlight,
  } = result;

  const highlightFields = highlight !== undefined && highlight;
  const data = Object.assign({}, source, highlightFields);
  const content = highlight ? data.text : data.text.toString().substr(0, 300);

  return (
    <SearchResultItem
      classification={data.classification}
      createdAt={formatDate(data.date)}
      link={path.motion(data.id)}
      title={data.onderwerp}
      score={score}
    >
      {content}
    </SearchResultItem>
  );
};

SearchResultContainer.propTypes = propTypes;

export default SearchResultContainer;
