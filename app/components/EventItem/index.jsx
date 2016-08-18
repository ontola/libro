// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  title: 'Loading...',
  text: '...',
};

const EventItem = ({ title, text }) => (
  <div className="EventItem">
    <Heading size="3" children={title} />
    {text}
  </div>
);

EventItem.propTypes = propTypes;
EventItem.defaultProps = defaultProps;

export default EventItem;
