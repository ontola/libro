import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import form from '../../ontology/form';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

const FormPageFooter = (childProps) => {
  const { formID, object } = React.useContext(FormContext);
  const context = React.useMemo(() => ({
    formID,
    object,
    theme: 'preview',
  }), [formID, object]);

  return (
    <FormContext.Provider value={context}>
      <Property
        {...childProps}
        label={form.footerGroup}
      />
    </FormContext.Provider>
  );
};

FormPageFooter.type = form.Page;

FormPageFooter.topology = formFooterTopology;

export default register(FormPageFooter);
