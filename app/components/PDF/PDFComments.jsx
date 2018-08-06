import PropTypes from 'prop-types';
import React from 'react';

import CommentBubble from './PDFCommentBubble';

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  rotate: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

const demoComments = [
  {
    page: 1,
    targetValue: 'page=1&highlight=50,50',
    text: 'test',
  },
];

const PDFComments = ({ currentPage, rotate, scale }) => (
  <div
    className="PDFComments"
  >
    {demoComments.map((comment) => {
      if (comment.page === currentPage) {
        return (
          <CommentBubble
            key={comment.text}
            rotate={rotate}
            scale={scale}
            targetValue={comment.targetValue}
            text={comment.text}
          />
        );
      }
      return null;
    })}
  </div>
);

PDFComments.propTypes = propTypes;

export default PDFComments;
