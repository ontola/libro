import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';
import { useProperty } from 'link-redux';
import React from 'react';

import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { InputComponentProps } from '../FormField/InputComponentProps';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';

const StyledSlider = withStyles({
  active: {},
  markLabel: {
    '&[data-index="1"]': {
      transform: 'translateX(-100%)',
    },
    transform: 'translateX(0%)',
  },
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
    '&[aria-valuenow="NaN"]': {
      display: 'none',
    },
    'backgroundColor': '#fff',
    'border': '2px solid currentColor',
    'height': 24,
    'marginLeft': -12,
    'marginTop': -8,
    'width': 24,
  },
  track: {
    borderRadius: 4,
    height: 8,
  },
})(Slider);

const getAriaValueText = (v: number) => v.toString();

const SliderInput: React.FC<InputComponentProps> = ({
  fieldShape,
  inputValue,
  onChange,
  name,
}) => {
  const {
    maxInclusive,
    minInclusive,
  } = fieldShape || {};
  const [maxInclusiveLabel] = useProperty(ontola.maxInclusiveLabel);
  const [minInclusiveLabel] = useProperty(ontola.minInclusiveLabel);
  const handleChange = React.useCallback((e: any, val: any) => {
    e.preventDefault();
    onChange(val);
  }, [onChange]);

  if (maxInclusive === undefined || minInclusive === undefined) {
    return null;
  }

  const defaultMarks = [{
    label: minInclusiveLabel?.value ?? minInclusive,
    value: minInclusive,
  }, {
    label: maxInclusiveLabel?.value ?? maxInclusive,
    value: maxInclusive,
  }];

  return (
    <React.Fragment>
      <StyledSlider
        aria-labelledby="discrete-slider-custom"
        defaultValue={tryParseInt(inputValue)}
        getAriaValueText={getAriaValueText}
        marks={defaultMarks}
        max={maxInclusive}
        min={minInclusive}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
      <HiddenRequiredInput
        name={name}
        value={inputValue?.value}
      />
    </React.Fragment>
  );
};

export default SliderInput;
