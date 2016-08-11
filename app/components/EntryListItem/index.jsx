import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DetailsBar, Detail, Box, Heading } from 'components';

const propTypes = {
  data: PropTypes.object.isRequired,
};

const EntryListItem = ({ data }) => {
  const { id, title, date, content, type } = data;

  return (
    <Box>
      <Heading size="3">
        <Link
          to={`/doc/${id}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </Heading>
      <DetailsBar>
        {type && <Detail text={type} icon="lightbulb-o" />}
        {date && <Detail text={date} icon="clock-o" />}
      </DetailsBar>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Box>
  );
};

EntryListItem.propTypes = propTypes;

export default EntryListItem;
