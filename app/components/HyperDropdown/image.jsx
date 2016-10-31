import React from 'react';

const propTypes = {
  fa: React.PropTypes.string,
  image: React.PropTypes.object,
};

/**
 * @param {Object} props The props of the imageable element.
 * @returns {ReactElement|undefined} Proper image element.
 */
function image({ image: imgObj, fa }) {
  if (imgObj) {
    return <img src={imgObj.url} alt={imgObj.title} className={imgObj.className} />;
  } else if (fa) {
    return <span className={['fa', fa].join(' ')} />;
  }
  return undefined;
}

image.propTypes = propTypes;

export default image;
