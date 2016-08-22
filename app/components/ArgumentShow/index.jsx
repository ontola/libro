import React, { PropTypes } from 'react';
import { Box } from 'components';
import { sides } from 'components/shared/config';

const propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.number,
  creator: PropTypes.string,
  side: PropTypes.oneOf(sides).isRequired,
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
    author={creator}
    boxActions={buttons}
    children={content}
    date={createdAt}
    headingSize="3"
    headingVariant={side}
    showMeta
    title={title}
  />
);

ArgumentShow.propTypes = propTypes;
ArgumentShow.defaultProps = defaultProps;

export default ArgumentShow;
