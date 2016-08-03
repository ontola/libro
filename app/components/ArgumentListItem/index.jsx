// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
} from '../';

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    side: PropTypes.oneOf([
      'pro',
      'con',
    ]),
  }),
};

const defaultProps = {
  data: {
    title: 'Loading...',
    text: '...',
  },
};

const ArgumentListItem = ({ data }) => (
  <div>
    <Heading size="3" variant={data.side}>{data.title}</Heading>
    <div>{data.text}</div>
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
