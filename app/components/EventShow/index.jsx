// @flow
import React, { PropTypes } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Detail,
  DetailType,
  Button,
  List,
  DetailDate,
  DetailsBar,
  Heading,
} from 'components';
import EventItemContainer from 'containers/EventItemContainer';

const propTypes = {
  attendees: PropTypes.array,
  children: PropTypes.node,
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
  endDate: PropTypes.instanceOf(Date),
  eventItems: PropTypes.array,
  id: PropTypes.string,
  loading: false,
  onToggleAll: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  speeches: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  showIndex: true,
};

const EventShow = ({
  children,
  createdAt,
  endDate,
  eventItems,
  id,
  onToggleAll,
  startDate,
  text,
  title,
}) => {
  const renderEventItem = (eventItem) => (
    <EventItemContainer id={eventItem} eventId={id} />
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
              startsAt={startDate}
              endsAt={endDate}
            />
            <Detail>{status}</Detail>
          </DetailsBar>
        </CardHeader>
        <CardContent>
          <div>{text}</div>
          {children}
          <Button onClick={() => onToggleAll(id)}>
            Expand all
          </Button>
        </CardContent>
        {eventItems && eventItems.length > 0 &&
          <div>
            <List
              renderItem={renderEventItem}
              items={eventItems}
            />
          </div>
        }
      </Card>
      {speeches && <ChronoFeed items={speeches} />}
    </div>
  );
};

EventShow.propTypes = propTypes;
EventShow.defaultProps = defaultProps;

export default EventShow;
