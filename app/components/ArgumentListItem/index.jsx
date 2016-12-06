import './ArgumentListItem.scss';
import React, { PropTypes } from 'react';
import { sides } from 'components/shared/config';
import {
  Heading,
  HoverBox,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  side: PropTypes.oneOf(sides),
};

const defaultProps = {
  title: 'Loading...',
  text: '...',
};

const iconClassname = side => (side === 'pro' ? 'fa fa-plus' : 'fa fa-minus');

const hoverBoxChildren = (side, title) => (
  <span className="ArgumentListItem__wrapper">
    <span className={`ArgumentListItem__icon ${iconClassname(side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={side}>{title}</Heading>
    </div>
  </span>
);

const hoverBoxHiddenChildren = text => (
  <span>{text}</span>
);

const ArgumentListItem = ({
  side,
  title,
  text,
}) => (
  <div className={`ArgumentListItem ArgumentListItem--${side}`}>
    <HoverBox hiddenChildren={hoverBoxHiddenChildren(text)}>
      {hoverBoxChildren(side, title)}
    </HoverBox>
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
