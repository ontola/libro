// @flow
import React, { PropTypes } from 'react';
import { Event } from 'models';
import PersonContainer from 'containers/PersonContainer';
import EventItemsContainer from 'containers/EventItemsContainer';

import {
  Box,
  Detail,
  DetailsBar,
  Heading,
} from '../';

const propTypes = {
  data: PropTypes.instanceOf(Event),
  loading: PropTypes.bool,
};

const defaultProps = {
};

const renderAuthor = (user, url) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const EventShow = ({
  data,
}) => (
  <div className="EventShow">
    <Box>
      <Heading size="1" children={data.title} />
      <DetailsBar>
        <Detail text="Vergadering" icon="agenda" />
        {data.creator &&
          <PersonContainer
            user={data.creator}
            renderItem={renderAuthor}
          />
        }
        {data.createdAt &&
          <Detail
            text={data.createdAt}
            icon="clock-o"
          />
        }
      </DetailsBar>
      <div>{data.text}</div>
      <EventItemsContainer motionId={data.id} />
    </Box>
  </div>
);

EventShow.propTypes = propTypes;
EventShow.defaultProps = defaultProps;

export default EventShow;
