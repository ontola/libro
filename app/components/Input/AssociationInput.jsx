import {
  Property,
  linkType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import form from '../../ontology/form';
import { FormSection } from '../Form';

const AssociationInput = ({
  field,
  inputIndex,
  inputValue,
  name,
  path,
}) => {
  const lrs = useLRS();
  const nestedObject = inputValue['@id'];
  const nestedFormIRI = lrs.getResourceProperty(field, form.form);

  return (
    <FormSection
      formIRI={nestedFormIRI}
      name={name}
      object={nestedObject}
      path={path}
      propertyIndex={inputIndex}
    >
      <Property label={form.form}>
        <Property label={form.pages} />
      </Property>
    </FormSection>
  );
};

AssociationInput.propTypes = {
  field: linkType,
  inputIndex: PropTypes.number,
  inputValue: linkType,
  name: PropTypes.string,
  path: linkType,
};

export default AssociationInput;
