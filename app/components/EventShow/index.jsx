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
import TimelineShowButton from 'containers/TimelineShowButton';

const propTypes = {
  children: PropTypes.node,
  createdAt: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  eventItems: PropTypes.array,
  id: PropTypes.string,
  onToggleAll: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
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
  const renderEventItem = eventItem => (
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
              endDate={endDate}
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
          <TimelineShowButton id={'Timeline'} />
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
    </div>
  );
};

EventShow.propTypes = propTypes;
EventShow.defaultProps = defaultProps;

export default EventShow;
