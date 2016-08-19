// @flow
import React, { PropTypes } from 'react';
import { Box } from 'components';

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

  return (
    <Box
      title={data.onderwerp}
      date={data.date}
      type={data.classification}
      headingSize="3"
      showMeta
    >
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Box>
  );
};

SearchResultContainer.propTypes = propTypes;

export default SearchResultContainer;
