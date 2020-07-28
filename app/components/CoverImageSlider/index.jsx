import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import { linkType } from 'link-redux';
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { tryParseInt } from '../../helpers/numbers';
import useFormField from '../../hooks/useFormField';
import ontola from '../../ontology/ontola';

const ThumbComponent = (props) => (
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
    bottom: '1.1rem',
    color: '#3a8589',
    cursor: 'row-resize',
    height: 3,
    left: '0.2rem',
    padding: '13px 0',
    position: 'absolute',
    top: '1.1rem',
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
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    boxShadow: '#ebebeb 0px 2px 2px',
    flexDirection: 'column',
    height: 27,
    width: 27,
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
    height: 'auto',
  },
}));

const CoverImageSlider = ({
  imagePositionYShape,
  value,
  object,
  onChange,
}) => {
  const classes = useStyles();

  const [input] = useFormField({
    object,
    path: ontola.imagePositionY,
  });
  const imagePositionY = tryParseInt(input?.value?.[0]);
  const onImagePositionYChange = (event, newValue) => (
    input.onChange([rdf.literal(100 - newValue)])
  );

  useEffect(() => {
    onChange(null, 100 - (imagePositionY || CENTER_Y));
  }, [imagePositionY]);

  if (!input || !imagePositionYShape) {
    return null;
  }

  if (!onImagePositionYChange) {
    return null;
  }

  return (
    <Slider
      classes={classes}
      defaultValue={100 - imagePositionY}
      orientation="vertical"
      ThumbComponent={ThumbComponent}
      track={false}
      value={100 - value}
      onChange={onChange}
      onChangeCommitted={onImagePositionYChange}
    />
  );
};

CoverImageSlider.propTypes = {
  imagePositionYShape: linkType,
  object: linkType,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default CoverImageSlider;
