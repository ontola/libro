import rdf from '@ontologies/core';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { MAX_POSTAL_DIGITS, MIN_POSTAL_DIGITS } from '../../views/Glapp/helpers';

const PostalDigitsInput = ({
  className,
  id,
  inputIndex,
  value,
  rangeIndex,
  onChange,
}) => {
  const splitRange = value.value.split('-');

  const handleChange = (e) => {
    const newRange = splitRange.slice();
    newRange[rangeIndex] = e.target.value;

    onChange(rdf.literal(newRange.join('-')));
  };

  return (
    <input
      className={className}
      max={MAX_POSTAL_DIGITS}
      min={MIN_POSTAL_DIGITS}
      name={`${id}-${inputIndex}-${rangeIndex}`}
      type="number"
      value={splitRange[rangeIndex]}
      onChange={handleChange}
    />
  );
};

PostalDigitsInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  inputIndex: PropTypes.number,
  onChange: PropTypes.func,
  rangeIndex: PropTypes.number,
  value: linkType,
};

const style = { marginBottom: '0.5em' };

function PostalRangeInput(props) {
  const compProps = {
    index: 0,
    ...props,
  };

  return (
    <div style={style}>
      <PostalDigitsInput rangeIndex={0} {...compProps} />
      -
      <PostalDigitsInput rangeIndex={1} {...compProps} />
    </div>
  );
}

PostalRangeInput.propTypes = {
  value: PropTypes.arrayOf(linkType),
};

export default PostalRangeInput;
