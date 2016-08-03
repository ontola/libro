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
    content: '...',
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
  <div className={`ArgumentListItem ArgumentListItem--${data.side}`}>
    <span className={`ArgumentListItem__icon ${iconClassname(data.side)}`} />
    <div className="ArgumentListItem__text">
      <Heading size="4" variant={data.side}>{data.title}</Heading>
    </div>
  </div>
);

const hoverBoxHiddenChildren = (data) => (
  <span>{data.content}</span>
);

const ArgumentListItem = (props) => (
  <HoverBox
    children={hoverBoxChildren(props.data)}
    hiddenChildren={hoverBoxHiddenChildren(props.data)}
  />
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
