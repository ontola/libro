import schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FieldLabel from '../FieldLabel';

import InputElement from './InputElement';

const CheckboxTrailer = ({ name }) => {
  const [label] = useProperty(schema.name);

  return (
    <FieldLabel
      htmlFor={name}
      label={label?.value}
    />
  );
};

CheckboxTrailer.propTypes = {
  name: PropTypes.string,
};

const CheckboxInput = (fieldProps) => (
  <InputElement
    {...fieldProps}
    trailer={CheckboxTrailer}
    type="checkbox"
  />
);

export default CheckboxInput;
