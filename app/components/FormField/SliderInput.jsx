import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

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
  value,
  onChange,
  maxInclusive,
  minInclusive,
  marks,
}) => {
  const handleChange = (e, val) => {
    e.preventDefault();
    onChange(val);
  };

  return (
    <StyledSlider
      defaultValue={value?.value}
      marks={marks}
      max={maxInclusive}
      min={minInclusive}
      onChange={handleChange}
    />
  );
};

SliderInput.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.object),
  maxInclusive: PropTypes.number,
  minInclusive: PropTypes.number,
  onChange: PropTypes.func,
  value: linkType,
};

export default SliderInput;
