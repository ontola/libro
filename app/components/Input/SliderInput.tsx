import Slider from '@mui/material/Slider';
import { makeStyles } from '@mui/styles';
import { useProperty } from 'link-redux';
import React from 'react';

import { SHADOW_LIGHT } from '../../helpers/flow';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';

const SliderSize = 8;
const ThumpSizeModifier = 3;
const ThumbSize = SliderSize * ThumpSizeModifier;

const useSliderOverrideStyles = makeStyles<LibroTheme>((theme) => ({
  mark: {
    '&:not(&[data-index="0"])': {
      transform: 'translateY(-4px) translateX(-8px)',
    },
    backgroundColor: theme.palette.grey.xLight,
    borderRadius: '50%',
    height: `calc(${SliderSize}px * 2)`,
    transform: 'translateY(-4px)',
    width: `calc(${SliderSize}px * 2)`,
  },
  markLabel: {
    [theme.breakpoints.down('md')]: {
      '&[data-index="1"]': {
        transform: 'translateX(-100%)',
      },
      transform: 'translateX(0%)',
    },
    fontWeight: theme.typography.fontWeightBold,
    marginTop: '.5rem',
  },
  rail: {
    backgroundColor: theme.palette.grey.xLight,
    borderRadius: theme.shape.borderRadius,
    height: SliderSize,
    opacity: 1,
  },
  root: {
    filter: `drop-shadow(${SHADOW_LIGHT})`,
    height: SliderSize,
    marginTop: '.5rem',
  },
  thumb: {
    '&[aria-valuenow="NaN"]': {
      '&:hover': {
        fontSize: 20,
      },
      left: '50%',
      opacity: 0.2,
    },
    'height': ThumbSize,
    'marginLeft': `calc((${ThumbSize}px / 2) * -1)`,
    'marginTop': `calc((${ThumbSize}px / 2 - ${SliderSize}px / 2) * -1)`,
    'width': ThumbSize,
  },
  valueLabel: {
    left: 'calc(-50% + 8px)',
  },
}));

const getAriaValueText = (v: number) => Number.isNaN(v) ? '⭤' : v.toString();

const SliderInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const {
    fieldShape,
    name,
    onBlur,
    onFocus,
  } = React.useContext(formFieldContext);
  const overrideClasses = useSliderOverrideStyles();

  const {
    maxInclusive,
    minInclusive,
    required,
  } = fieldShape;

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
      <Slider
        aria-labelledby="discrete-slider-custom"
        classes={overrideClasses}
        defaultValue={tryParseInt(inputValue)}
        getAriaValueText={getAriaValueText}
        marks={defaultMarks}
        max={maxInclusive}
        min={minInclusive}
        track={false}
        valueLabelDisplay="auto"
        valueLabelFormat={getAriaValueText}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
      />
      {required && (
        <HiddenRequiredInput
          name={name}
          value={inputValue?.value}
        />
      )}
    </React.Fragment>
  );
};

export default SliderInput;
