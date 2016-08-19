// @flow
import './ArgumentShow.scss';
import React, { PropTypes } from 'react';
import { Box } from 'components';

const propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.number,
  creator: PropTypes.string,
  side: PropTypes.oneOf([
    'pro',
    'con',
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  title: 'Loading...',
  text: '...',
};

const buttons = [{
  icon: 'comment',
  label: 'Reageer',
}, {
  icon: 'arrow-up',
  label: 'Upvote',
}];

const ArgumentShow = ({
  content,
  creator,
  createdAt,
  side,
  title,
}) => (
  <Box
    title={title}
    date={createdAt}
    author={creator}
    children={content}
    boxActions={buttons}
    headingSize="3"
    headingVariant={side}
    showMeta
  />
);

ArgumentShow.propTypes = propTypes;
ArgumentShow.defaultProps = defaultProps;

export default ArgumentShow;
