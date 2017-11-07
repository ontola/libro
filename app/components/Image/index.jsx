import { linkedPropType } from 'link-redux';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const FABase = 'http://fontawesome.io/icon/';

const propTypes = {
  className: PropTypes.string,
  linkedProp: linkedPropType,
  override: PropTypes.func,
  style: PropTypes.object,
};

function Image(props) {
  const {
    className, override, style, linkedProp
  } = props;
  if (linkedProp.startsWith(FABase)) {
    return <FontAwesome name={linkedProp.split(FABase)[1]} />;
  }
  if (typeof override !== 'undefined') {
    return override(props);
  }
  return (
    <img
      className={className}
      role="presentation"
      src={linkedProp}
      style={style}
    />
  );
}

Image.propTypes = propTypes;

export default Image;
