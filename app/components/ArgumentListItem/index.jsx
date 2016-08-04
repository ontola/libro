// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
  HoverBox,
} from '../';
import './argumentlistitem.scss';

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

const iconClassname = (side) => {
  switch (side) {
    case 'pro':
      return ('fa fa-plus');
    default:
      return ('fa fa-minus');
  }
};

const hoverBoxChildren = (data) => (
  <span className="ArgumentListItem__wrapper">
    <span className={`ArgumentListItem__icon ${iconClassname(data.side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={data.side}>{data.title}</Heading>
    </div>
  </span>
);

const hoverBoxHiddenChildren = (data) => (
  <span>{data.content}</span>
);

const ArgumentListItem = (props) => (
  <div className={`ArgumentListItem ArgumentListItem--${props.data.side}`}>
    <HoverBox
      children={hoverBoxChildren(props.data)}
      hiddenChildren={hoverBoxHiddenChildren(props.data)}
    />
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
