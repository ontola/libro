// @flow
// import './Attachment.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const EventItem = ({
  title,
  url,
}) => {
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
        children={content}
      />
      {progress}
    </div>
  );
};

export default EventItem;
EventItem.propTypes = propTypes;
