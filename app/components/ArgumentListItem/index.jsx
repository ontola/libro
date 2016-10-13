import './ArgumentListItem.scss';
import React, { PropTypes } from 'react';
import { sides } from 'components/shared/config';
import {
  Heading,
  HoverBox,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  side: PropTypes.oneOf(sides),
};

const defaultProps = {
  title: 'Loading...',
  content: '...',
};

const iconClassname = (side) => {
  const className = side === 'pro' ? 'fa fa-plus' : 'fa fa-minus';
  return className;
};

const hoverBoxChildren = (side, title) => (
  <span className="ArgumentListItem__wrapper">
    <span className={`ArgumentListItem__icon ${iconClassname(side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={side}>{title}</Heading>
    </div>
  </span>
);

const hoverBoxHiddenChildren = content => (
  <span>{content}</span>
);

const ArgumentListItem = ({
  side,
  title,
  content,
}) => (
  <div className={`ArgumentListItem ArgumentListItem--${side}`}>
    <HoverBox hiddenChildren={hoverBoxHiddenChildren(content)}>
      {hoverBoxChildren(side, title)}
    </HoverBox>
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
