// @flow
import './EventItemShow.scss';
import React, { PropTypes } from 'react';
import {
  Detail,
  DetailsBar,
  DetailDate,
  Heading,
  Progress,
} from 'components';
import CollapsibleContainer from 'containers/CollapsibleContainer';

const propTypes = {
  startDate: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  eventId: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  isCurrent: PropTypes.bool,
  showIndex: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const EventItemShow = ({
  children,
  startDate,
  endDate,
  currentDate,
  eventId,
  id,
  index,
  isCurrent,
  showIndex,
  text,
  title,
}) => {
  const totalDuration = () => Math.abs(endDate - startDate);
  const completedDuration = () => Math.abs(currentDate - startDate);

  const progress = isCurrent ? (
    <Progress
      total={totalDuration(startDate, endDate)}
      completed={completedDuration(startDate, currentDate)}
      direction="down"
    />) :
    false;

  const content = (
    <div className="EventItemShow__content">
      {text}
      {children}
    </div>
  );

  const detailsBar = (
    <DetailsBar>
      {((startDate)) &&
        <DetailDate
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          isCurrent={isCurrent}
          asHours
          hideIcon
        />}
      {text &&
        <Detail
          icon="align-left"
          text={`${text.split(' ').length} woorden`}
        />
      }
    </DetailsBar>
  );

  const indexComponent = (
    <div className="EventItemShow__index">
      {index}.
    </div>
  );

  const heading = <Heading size="3">{title}</Heading>;

  return (
    <div className="EventItemShow">
      {showIndex && !isCurrent && indexComponent}
      {text &&
        <CollapsibleContainer
          trigger={heading}
          visibleContent={detailsBar}
          group={`event.${eventId}`}
          id={`eventItem.${id}`}
        >
          {content}
        </CollapsibleContainer>
      }
      {!text && heading}
      {!text && detailsBar}
      {progress}
    </div>
  );
};

EventItemShow.propTypes = propTypes;

export default EventItemShow;
