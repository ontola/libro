import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import { FormContext } from './Form';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  path: linkType,
  propertyIndex: PropTypes.number,
};

const FormSection = ({
  children,
  formIRI,
  name,
  object,
  path,
  propertyIndex,
}: {
  children: React.ReactNode,
  formIRI: SomeNode,
  name: string,
  object: SomeNode,
  path: NamedNode,
  propertyIndex: number,
}) => {
  const formContext = React.useContext(FormContext);
  const formSection = calculateFormFieldName(name, propertyIndex);
  const sectionContext = React.useMemo(() => ({
    ...formContext,
    formIRI,
    formSection,
    object,
  }), [formContext, formIRI, formSection, object]);

  return (
    <FormContext.Provider value={sectionContext}>
      <fieldset className="Field__section" property={path.value}>
        {children}
      </fieldset>
    </FormContext.Provider>
  );
};

FormSection.propTypes = propTypes;

export default FormSection;
