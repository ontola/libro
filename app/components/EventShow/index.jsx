// @flow
import React, { PropTypes } from 'react';

import {
  Box,
  Button,
  Detail,
} from '../';

const propTypes = {
  children: PropTypes.node,
  expandAll: PropTypes.function,
  loading: false,
  title: PropTypes.string,
  text: PropTypes.string,
  startDate: PropTypes.integer,
  endDate: PropTypes.integer,
  createdAt: PropTypes.integer,
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
    <Box
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
    </Box>
  </div>
);

EventShow.propTypes = propTypes;
EventShow.defaultProps = defaultProps;

export default EventShow;
