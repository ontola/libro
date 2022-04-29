import Slider from '@mui/material/Slider';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { tryParseInt } from '../../helpers/numbers';
import { useFormFieldForPath } from '../../hooks/useFormFieldForPath';
import ontola from '../../ontology/ontola';

const ThumbComponent = (props: any) => (
  <span {...props}>
    <span className="bar" />
    <span className="bar" />
    <span className="bar" />
  </span>
);

const CENTER_Y = 50;

const useStyles = makeStyles(() => ({
  active: {},
  root: {
    '&.MuiSlider-vertical': {
      height: 'auto',
    },
    'bottom': '1.1rem',
    'color': '#3a8589',
    'cursor': 'row-resize',
    'height': 3,
    'left': '0.2rem',
    'padding': '13px 0',
    'position': 'absolute',
    'top': '1.1rem',
  },
  thumb: {
    '& .bar': {
      backgroundColor: 'currentColor',
      height: 1,
      marginBottom: 1,
      marginTop: 1,
      width: 9,
    },
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    'backgroundColor': '#fff',
    'border': '1px solid currentColor',
    'boxShadow': '#ebebeb 0px 2px 2px',
    'flexDirection': 'column',
    'height': 27,
    'width': 27,
  },
  track: {
    height: 3,
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  vertical: {
    '& .MuiSlider-rail': {
      width: 0,
    },
    '& .MuiSlider-thumb': {
      marginBottom: -13,
      marginLeft: -12,
    },
    'height': 'auto',
  },
}));

interface PropTypes {
  onChange: (e: any, value: number | number[]) => void;
  value: number;
}

const CoverImageSlider: React.FC<PropTypes> = ({
  value,
  onChange,
}) => {
  const classes = useStyles();
  const {
    values,
    onChange: inputOnChange,
  } = useFormFieldForPath(ontola.imagePositionY);
  const imagePositionY = tryParseInt(values?.[0]);

  const onImagePositionYChange = (_: any, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;

    inputOnChange([rdf.literal(100 - val)]);
  };

  useEffect(() => {
    onChange(null, 100 - (imagePositionY || CENTER_Y));
  }, [imagePositionY]);

  if (!inputOnChange || !values) {
    return null;
  }

  if (!onImagePositionYChange) {
    return null;
  }

  return (
    <Slider
      ThumbComponent={ThumbComponent}
      classes={classes}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      defaultValue={100 - (imagePositionY || 50)}
      orientation="vertical"
      track={false}
      value={100 - value}
      onChange={onChange}
      onChangeCommitted={onImagePositionYChange}
    />
  );
};

export default CoverImageSlider;
