// @flow
import React, { PropTypes } from 'react';

import {
  Card,
  Button,
  Detail,
} from '../';

const propTypes = {
  children: PropTypes.node,
  expandAll: PropTypes.function,
  loading: false,
  title: PropTypes.string,
  text: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
};

const defaultProps = {
};

const details = [
  <Detail icon="clock-o" text="20-01-2012 23:30" />,
];

const EventShow = ({
  children,
  createdAt,
  creator,
  expandAll,
  text,
  title,
}) => (
  <div className="EventShow">
    <Card
      type="meeting"
      author={creator}
      date={createdAt}
      headingSize={1}
      title={title}
      showMeta
      details={details}
    >
      <div>{text}</div>
      {children}
      <Button onClick={expandAll}>
        Expand all
      </Button>
    </Card>
  </div>
);

EventShow.propTypes = propTypes;
EventShow.defaultProps = defaultProps;

export default EventShow;
