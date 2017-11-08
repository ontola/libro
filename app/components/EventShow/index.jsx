// @flow
import React, { PropTypes } from 'react';

import EventItemContainer from 'containers/EventItemContainer';
import TimelineShowButton from 'containers/TimelineShowButton';
import EventItem from 'models/EventItem';

import Card, {
  CardContent,
  CardHeader,
} from '../Card';
import Detail from '../Detail';
import DetailType from '../DetailType';
import Button from '../Button';
import List from '../List';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import Heading from '../Heading';

const propTypes = {
  children: PropTypes.node,
  createdAt: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  eventItems: PropTypes.arrayOf(EventItem),
  id: PropTypes.string,
  onToggleAll: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  text: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
};

const EventShow = ({
  children,
  createdAt,
  endDate,
  eventItems,
  id,
  onToggleAll,
  startDate,
  status,
  text,
  title,
}) => {
  const renderEventItem = eventItem => (
    <EventItemContainer eventId={id} id={eventItem} />
  );

  return (
    <div className="EventShow">
      <Card>
        <CardHeader>
          <Heading>{title}</Heading>
          <DetailsBar>
            <DetailType type="meeting" />
            <DetailDate
              createdAt={createdAt}
              endDate={endDate}
              startsAt={startDate}
            />
            <Detail>{status}</Detail>
          </DetailsBar>
        </CardHeader>
        <CardContent>
          <div>{text}</div>
          {children}
          <Button
            onClick={() => onToggleAll(id)}
            theme="transparant"
            small
            icon="expand"
          >
            Agendapunten uitklappen
          </Button>
          <TimelineShowButton id="Timeline" />
        </CardContent>
        {eventItems && eventItems.length > 0 &&
          <div>
            <List
              items={eventItems}
              renderItem={renderEventItem}
            />
          </div>
        }
      </Card>
    </div>
  );
};

EventShow.propTypes = propTypes;

export default EventShow;
