import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';

import { formContext } from './FormContext';

interface PropTypes {
  formIRI: SomeNode;
  name: string;
  object: SomeNode;
  path: NamedNode;
  propertyIndex: number;
}

const FormSection: React.FC<PropTypes> = ({
  children,
  formIRI,
  name,
  object,
  path,
  propertyIndex,
}) => {
  const formContextProps = React.useContext(formContext);
  const formSection = calculateFormFieldName(name, propertyIndex);
  const sectionContext = React.useMemo(() => ({
    ...formContextProps,
    formIRI,
    formSection,
    object,
    parentObject: formContextProps.object,
    whitelist: undefined,
  }), [formContextProps, formIRI, formSection, object]);

  return (
    <formContext.Provider value={sectionContext}>
      <fieldset
        className="Field__section"
        property={path.value}
      >
        {children}
      </fieldset>
    </formContext.Provider>
  );
};

export default FormSection;
