import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import HiddenRequiredInput from '../Input/HiddenRequiredInput';

import FieldHelper from './FieldHelper';

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
  helperText,
  marks,
  maxInclusive,
  minInclusive,
  name,
  onChange,
  value,
}) => {
  const handleChange = (e, val) => {
    e.preventDefault();
    onChange(val);
  };

  if (!maxInclusive || !minInclusive) {
    return null;
  }

  const defaultMarks = [{
    label: minInclusive,
    value: minInclusive,
  }, {
    label: maxInclusive,
    value: maxInclusive,
  }];

  return (
    <React.Fragment>
      <FieldHelper helperText={helperText} />
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
      <HiddenRequiredInput name={name} value={value?.value} />
    </React.Fragment>
  );
};

SliderInput.propTypes = {
  helperText: PropTypes.string,
  marks: PropTypes.arrayOf(PropTypes.object),
  maxInclusive: PropTypes.number,
  minInclusive: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: linkType,
};

export default SliderInput;
