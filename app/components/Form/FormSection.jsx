import PropTypes from 'prop-types';
import React from 'react';
import { linkType } from 'link-redux';

import { calculateFormFieldName } from '../../helpers/forms';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  path: linkType,
  propertyIndex: PropTypes.number,
};

export const FormSectionContext = React.createContext(undefined);

const FormSection = ({
  children,
  path,
  propertyIndex,
  name,
}) => {
  const contextLabel = calculateFormFieldName(name, propertyIndex);

  return (
    <FormSectionContext.Provider value={contextLabel}>
      <fieldset className="Field__section" property={path.value}>
        {children}
      </fieldset>
    </FormSectionContext.Provider>
  );
};

FormSection.propTypes = propTypes;

export default FormSection;
