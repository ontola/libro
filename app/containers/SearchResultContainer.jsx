// @flow
import React, { PropTypes } from 'react';
import { EntryListItem } from 'components';

const propTypes = {
  result: PropTypes.object.isRequired,
};

const SearchResultContainer = ({ result }) => {
  const {
    _source: source,
    highlight,
  } = result;

  const highlightFields = highlight !== undefined && highlight;
  const data = Object.assign({}, source, highlightFields);
  const content = highlight ? data.text : data.text.toString().substr(0, 300);

  const returnData = {
    id: data.id,
    title: data.onderwerp,
    date: data.date,
    content,
    type: data.classification,
    fileId: data.file_id,
  };
  return <EntryListItem data={returnData} />;
};

SearchResultContainer.propTypes = propTypes;

export default SearchResultContainer;
