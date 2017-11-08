import React, { PropTypes } from 'react';

export const imageShape = React.PropTypes.shape({
  className: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
});

const propTypes = {
  fa: React.PropTypes.string,
  image: imageShape,
};

/**
 * @param {Object} props The props of the imageable element.
 * @returns {ReactElement|undefined} Proper image element.
 */
function image({ image: imgObj, fa }) {
  if (imgObj) {
    return <img alt={imgObj.title} className={imgObj.className} src={imgObj.url} />;
  } else if (fa) {
    return <span className={['fa', fa].join(' ')} />;
  }
  return undefined;
}

image.propTypes = propTypes;

export default image;
