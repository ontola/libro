import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const FABase = 'http://fontawesome.io/icon/';

const propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  linkedProp: linkedPropType.isRequired,
  override: PropTypes.func,
  style: PropTypes.shape({
    maxHeight: PropTypes.string,
  }),
};

function Image(props) {
  const {
    ariaLabel, className, override, style, linkedProp,
  } = props;
  if (linkedProp.value.startsWith(FABase)) {
    return (
      <FontAwesome
        ariaLabel={ariaLabel || ''}
        className={className}
        name={linkedProp.value.split(FABase)[1]}
        style={style}
      />
    );
  }
  if (typeof override !== 'undefined') {
    return override(props);
  }
  return (
    <img
      alt={ariaLabel || ''}
      className={className}
      src={linkedProp.value}
      style={style}
    />
  );
}

Image.propTypes = propTypes;

export default Image;
