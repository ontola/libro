import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';

import { calculateFormFieldName } from '../../lib/helpers';
import { formFieldContext } from '../FormField/FormFieldContext';

import { FormTheme, formContext } from './FormContext';

interface PropTypes {
  className?: string;
  formIRI: SomeNode;
  name: string;
  object: SomeNode;
  path?: NamedNode;
  propertyIndex: number;
  theme?: FormTheme;
}

const FormSection: React.FC<PropTypes> = ({
  children,
  className,
  formIRI,
  name,
  object,
  path,
  propertyIndex,
  theme,
}) => {
  const { onChange } = React.useContext(formFieldContext);
  const formContextProps = React.useContext(formContext);
  const formSection = calculateFormFieldName(name, propertyIndex);
  const sectionContext = React.useMemo(() => ({
    ...formContextProps,
    formIRI,
    formSection,
    handleParentChange: onChange,
    object,
    parentObject: formContextProps.object,
    theme,
    whitelist: undefined,
  }), [formContextProps, formIRI, formSection, object, onChange, theme]);

  if (!path) {
    return (
      <formContext.Provider value={sectionContext}>
        {children}
      </formContext.Provider>
    );
  }

  return (
    <formContext.Provider value={sectionContext}>
      <fieldset
        className={className}
        property={path.value}
      >
        {children}
      </fieldset>
    </formContext.Provider>
  );
};

export default FormSection;
