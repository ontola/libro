import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DetailsBar, Detail, Box, Heading } from '../';

const propTypes = {
  result: PropTypes.object.isRequired,
};

function EntryListItem({ result }) {
  const source = Object.assign({}, result._source, result.highlight);
  const text = result.highlight ? source.text : source.text.substr(0, 300);

  return (
    <Box>
      <div className="box__content">
        <Heading size="3">
          <Link
            to={`/doc/${result._id}`}
            dangerouslySetInnerHTML={{ __html: source.onderwerp }}
          />
        </Heading>
        <DetailsBar>
          <Detail text={result._source.classification} icon="lightbulb-o" />
          <Detail text={result._source.date} icon="clock-o" />
        </DetailsBar>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </Box>
  );
}

EntryListItem.propTypes = propTypes;

export default EntryListItem;
