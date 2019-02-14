import PropTypes from 'prop-types';
import React from 'react';
import { linkType } from 'link-redux';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  path: linkType,
  propertyIndex: PropTypes.number,
};

export const FormSectionContext = React.createContext(undefined);

const FormSection = ({
  children,
  name,
  path,
  propertyIndex,
}) => {
  const formSectionContext = React.useContext(FormSectionContext);
  const sectionContext = formSectionContext ? `${formSectionContext}.` : '';
  const index = propertyIndex !== undefined ? `${propertyIndex}.` : '';

  const contextLabel = `${sectionContext}${index}${name}`;

  return (
    <FormSectionContext.Provider value={contextLabel}>
      <fieldset property={path.value}>
        {children}
      </fieldset>
    </FormSectionContext.Provider>
  );
};

FormSection.propTypes = propTypes;

export default FormSection;
