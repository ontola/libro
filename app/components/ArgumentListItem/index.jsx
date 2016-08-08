// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
  HoverBox,
} from '../';
import './argumentlistitem.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  side: PropTypes.oneOf([
    'pro',
    'con',
  ]),
};

const defaultProps = {
  title: 'Loading...',
  content: '...',
};

const iconClassname = (side) => {
  switch (side) {
    case 'pro':
      return ('fa fa-plus');
    default:
      return ('fa fa-minus');
  }
};

const hoverBoxChildren = (side, title) => (
  <span className="ArgumentListItem__wrapper">
    <span className={`ArgumentListItem__icon ${iconClassname(side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={side}>{title}</Heading>
    </div>
  </span>
);

const hoverBoxHiddenChildren = (content) => (
  <span>{content}</span>
);

const ArgumentListItem = ({ side, title, content }) => (
  <div className={`ArgumentListItem ArgumentListItem--${side}`}>
    <HoverBox
      children={hoverBoxChildren(side, title)}
      hiddenChildren={hoverBoxHiddenChildren(content)}
    />
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
