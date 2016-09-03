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
  totalTime: PropTypes.number,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const EventItem = ({
  elapsedTime,
  isCurrent,
  index,
  showIndex,
  totalTime,
  text,
  title,
}) => {
  const progress = isCurrent ? (
    <Progress
      completed={elapsedTime}
      total={totalTime}
      direction="down"
    />) :
    false;

  const detailsBar = (
    <DetailsBar>
      {totalTime &&
        <DetailDuration
          elapsedTime={elapsedTime}
          totalTime={totalTime}
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
