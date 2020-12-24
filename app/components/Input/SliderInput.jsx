import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { fieldShapeType } from '../../hooks/useFormField';

const StyledSlider = withStyles({
  active: {},
  rail: {
    borderRadius: 4,
    height: 8,
  },
  root: {
    height: 8,
  },
  thumb: {
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    height: 24,
    marginLeft: -12,
    marginTop: -8,
    width: 24,
  },
  track: {
    borderRadius: 4,
    height: 8,
  },
})(Slider);

const SliderInput = ({
  fieldShape,
  value,
  onChange,
  marks,
}) => {
  const {
    maxInclusive,
    minInclusive,
  } = fieldShape;
  const handleChange = (e, val) => {
    e.preventDefault();
    onChange(val);
  };

  const defaultMarks = [{
    label: minInclusive,
    value: minInclusive,
  }, {
    label: maxInclusive,
    value: maxInclusive,
  }];

  return (
    <StyledSlider
      aria-labelledby="discrete-slider-custom"
      defaultValue={value?.value}
      getAriaValueText={(v) => v}
      marks={marks || defaultMarks}
      max={maxInclusive}
      min={minInclusive}
      valueLabelDisplay="auto"
      onChange={handleChange}
    />
  );
};

SliderInput.propTypes = {
  fieldShape: fieldShapeType,
  marks: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  value: linkType,
};

export default SliderInput;
