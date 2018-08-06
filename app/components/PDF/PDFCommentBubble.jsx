import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  rotate: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  /**
   * Parameters from IRI that give the page and coordinates of the target.
   * @example page=10&viewrect=50,50,640,48
   */
  targetValue: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const pathToCoordinatesAndPage = (path) => {
  const params = new URLSearchParams(path);
  const [x, y] = params.get('highlight').split(',');

  return {
    x,
    y,
  };
};

const rotateOne = 90;
const rotateTwo = 180;
const rotateThree = 270;

const rotatePosition = (angle) => {
  switch (angle) {
    case 0:
      return {
        x: 'left',
        y: 'top',
      };
    case rotateOne:
      return {
        x: 'top',
        y: 'right',
      };
    case rotateTwo:
      return {
        x: 'right',
        y: 'bottom',
      };
    case rotateThree:
      return {
        x: 'bottom',
        y: 'left',
      };
    default:
      return {
        x: 'left',
        y: 'right',
      };
  }
};

const CommentBubble = ({
  targetValue,
  text,
  rotate,
  scale,
}) => {
  const {
    x,
    y,
  } = pathToCoordinatesAndPage(targetValue);

  return (
    <div
      className="PDFViewer__comment-wrapper"
      style={{
        [rotatePosition(rotate).x]: `${x * scale}px`,
        [rotatePosition(rotate).y]: `${y * scale}px`,
      }}
    >
      <div className="PDFViewer__comment">
        <div className="PDFViewer__comment__bubble">
          <FontAwesome name="comment" />
        </div>
        <div className="PDFViewer__comment__content">
          {text}
        </div>
      </div>
    </div>
  );
};

CommentBubble.propTypes = propTypes;

export default CommentBubble;
