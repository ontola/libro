// @flow
import React, { PropTypes } from 'react';
import {
  Heading,
  HoverBox,
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

const hoverBoxChildren = (data) => (
  <Heading size="4" variant={data.side}>{data.title}</Heading>
);

const hoverBoxHiddenChildren = (data) => (
  <span>Hier komt de beschrijving van het argument te staan. Momenteel is er echter alleen
  nog dummy data!</span>
);

const ArgumentListItem = (props) => (
  <div>
    <HoverBox
      children={hoverBoxChildren(props.data)}
      hiddenChildren={hoverBoxHiddenChildren(props.data)}
    />
  </div>
);

ArgumentListItem.propTypes = propTypes;
ArgumentListItem.defaultProps = defaultProps;

export default ArgumentListItem;
