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
  theme,
}) => {
  const lrs = useLRS();
  const nestedObject = inputValue['@id'];
  const nestedFormIRI = lrs.getResourceProperty(field, form.form);

  return (
    <FormSection name={name} path={path} propertyIndex={inputIndex}>
      <Property label={form.form}>
        <Property
          childProps={{
            formIRI: nestedFormIRI,
            object: nestedObject,
            theme,
          }}
          label={form.pages}
        />
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
  theme: PropTypes.string,
};

export default AssociationInput;
