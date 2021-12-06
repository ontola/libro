import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';

import { FormContext } from './Form';

interface PropTypes {
  className?: string;
  formIRI: SomeNode;
  name: string;
  object: SomeNode;
  path: NamedNode;
  propertyIndex: number;
}

const FormSection: React.FC<PropTypes> = ({
  children,
  className,
  formIRI,
  name,
  object,
  path,
  propertyIndex,
}) => {
  const formContext = React.useContext(FormContext);
  const formSection = calculateFormFieldName(name, propertyIndex);
  const sectionContext = React.useMemo(() => ({
    ...formContext,
    formIRI,
    formSection,
    object,
    parentObject: formContext.object,
    whitelist: undefined,
  }), [formContext, formIRI, formSection, object]);

  return (
    <FormContext.Provider value={sectionContext}>
      <fieldset
        className={className}
        property={path.value}
      >
        {children}
      </fieldset>
    </FormContext.Provider>
  );
};

export default FormSection;
