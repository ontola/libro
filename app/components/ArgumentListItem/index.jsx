import PropTypes from 'prop-types';
import React from 'react';

import Heading from '../Heading';
import HoverBox from '../HoverBox';

import './ArgumentListItem.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['pro', 'con']),
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'Loading...',
  text: '...',
};

const iconClassname = side => (side === 'pro' ? 'fa fa-plus' : 'fa fa-minus');

const hoverBoxChildren = (side, name) => (
  <span className="ArgumentListItem__wrapper">
    <span className={`ArgumentListItem__icon ${iconClassname(side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={side}>{name}</Heading>
    </div>
  </span>
);

const hoverBoxHiddenChildren = text => (
  <span>{text}</span>
);

const ArgumentListItem = ({
  side,
  name,
  text,
}) => (
  <div className={`ArgumentListItem ArgumentListItem--${side}`}>
    <HoverBox hiddenChildren={hoverBoxHiddenChildren(text)}>
      {hoverBoxChildren(side, name)}
    </HoverBox>
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
