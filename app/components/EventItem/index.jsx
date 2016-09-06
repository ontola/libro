// @flow
import './EventItem.scss';
import React, { PropTypes } from 'react';
import {
  Collapsible,
  DetailsBar,
  DetailDuration,
  Heading,
  Progress,
} from 'components';

const propTypes = {
  elapsedTime: PropTypes.number,
  isCurrent: PropTypes.bool,
  index: PropTypes.number,
  showIndex: PropTypes.bool,
  plannedTime: PropTypes.number,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const EventItem = ({
  elapsedTime,
  isCurrent,
  index,
  showIndex,
  plannedTime,
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
    <div className="EventItem__Index">
      {index}.
    </div>
  );

  return (
    <div className="EventItem">
      {showIndex && !isCurrent && indexComponent}
      <Collapsible
        trigger={
          <Heading
            size="3"
            children={title}
          />}
        visibleContent={detailsBar}
        children={text}
      />
      {progress}
    </div>
  );
};

export default EventItem;
EventItem.propTypes = propTypes;
