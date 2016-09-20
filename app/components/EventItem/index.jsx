// @flow
import './EventItem.scss';
import React, { PropTypes } from 'react';
import {
  DetailsBar,
  DetailDuration,
  Heading,
  Progress,
} from 'components';
import CollapsibleContainer from 'containers/CollapsibleContainer';

const propTypes = {
  children: PropTypes.node,
  elapsedTime: PropTypes.number,
  eventId: PropTypes.string.isRequired,
  index: PropTypes.number,
  isCurrent: PropTypes.bool,
  plannedTime: PropTypes.number,
  showIndex: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const EventItem = ({
  children,
  elapsedTime,
  eventId,
  index,
  isCurrent,
  plannedTime,
  showIndex,
  text,
  title,
}) => {
  const progress = isCurrent ? (
    <Progress
      completed={elapsedTime}
      total={plannedTime}
      direction="down"
    />) :
    false;

  const content = (
    <div>
      {text}
      {children}
    </div>
  );

  const detailsBar = (
    <DetailsBar>
      {(plannedTime || elapsedTime) &&
        <DetailDuration
          elapsedTime={elapsedTime}
          totalTime={plannedTime}
          isCurrent={isCurrent}
        />}
    </DetailsBar>
  );

  const indexComponent = (
    <div className="EventItem__index">
      {index}.
    </div>
  );

  return (
    <div className="EventItem">
      {showIndex && !isCurrent && indexComponent}
      <CollapsibleContainer
        trigger={
          <Heading
            size="3"
            children={title}
          />}
        visibleContent={detailsBar}
        children={content}
        group={`event.${eventId}`}
      />
      {progress}
    </div>
  );
};

EventItem.propTypes = propTypes;

export default EventItem;
