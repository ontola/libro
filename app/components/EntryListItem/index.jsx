import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DetailsBar, Detail, Box, Heading } from '../';

const propTypes = {
  data: PropTypes.object.isRequired,
};

function EntryListItem({ data }) {
  const { id, title, date, content, type } = data;

  return (
    <Box>
      <div className="box__content">
        <Heading size="3">
          <Link
            to={`/doc/${id}`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Heading>
        <DetailsBar>
          <Detail text={type} icon="lightbulb-o" />
          <Detail text={date} icon="clock-o" />
        </DetailsBar>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </Box>
  );
}

EntryListItem.propTypes = propTypes;

export default EntryListItem;
