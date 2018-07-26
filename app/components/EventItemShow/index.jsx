import PropTypes from 'prop-types';
import React from 'react';

import CollapsibleContainer from 'containers/CollapsibleContainer';

import Detail from '../Detail';
import DetailsBar from '../DetailsBar';
import DetailDate from '../DetailDate';
import Heading from '../Heading';
import Progress from '../Progress';

import './EventItemShow.scss';

const propTypes = {
  children: PropTypes.node,
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  eventId: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  isCurrent: PropTypes.bool,
  showIndex: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
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

  const progress = isCurrent && (
    <Progress
      completed={completedDuration(startDate, currentDate)}
      direction="down"
      total={totalDuration(startDate, endDate)}
    />
  );

  const content = (
    <div className="EventItemShow__content">
      {text}
      {children}
    </div>
  );

  const detailsBar = (
    <DetailsBar>
      {((startDate)) && (
      <DetailDate
        asHours
        hideIcon
        currentDate={currentDate}
        endDate={endDate}
        isCurrent={isCurrent}
        startDate={startDate}
      />
      )}
      {text && (
      <Detail
        icon="align-left"
        text={`${text.split(' ').length} woorden`}
      />
      )}
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
      {text && (
      <CollapsibleContainer
        group={`event.${eventId}`}
        id={`eventItem.${id}`}
        trigger={heading}
        visibleContent={detailsBar}
      >
        {content}
      </CollapsibleContainer>
      )}
      {!text && heading}
      {!text && detailsBar}
      {progress}
    </div>
  );
};

EventItemShow.propTypes = propTypes;

export default EventItemShow;
