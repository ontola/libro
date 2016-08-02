// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
  MarkdownContent,
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
    <Heading size="3" className={data.side}>{data.title}</Heading>
    <MarkdownContent content={data.text} />
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
