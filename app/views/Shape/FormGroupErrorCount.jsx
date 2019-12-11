import sh from '@ontologies/shacl';
import { linkType, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormState } from 'react-final-form';
import FontAwesome from 'react-fontawesome';

import { calculateFormFieldName } from '../../helpers/forms';

const FormGroupErrorCount = ({
  className,
  properties,
  propertyIndex,
}) => {
  const lrs = useLRS();
  const formState = useFormState({
    subscription: {
      errors: true,
    },
  });

  const fieldNames = properties.map(prop => (
    calculateFormFieldName(propertyIndex, lrs.getResourceProperty(prop, sh.path))
  ));

  const invalidCount = Object
    .keys(formState.errors)
    .filter(i => fieldNames.indexOf(i) > -1)
    .length;

  if (invalidCount === 0) {
    return null;
  }

  return (
    <div className={className}>
      <FontAwesome name="exclamation-circle" />
      {invalidCount}
    </div>
  );
};

FormGroupErrorCount.propTypes = {
  className: PropTypes.string,
  properties: PropTypes.arrayOf(linkType),
  propertyIndex: PropTypes.number,
};

export default FormGroupErrorCount;
