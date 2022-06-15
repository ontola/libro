import { Property, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFooterTopology } from '../../../../topologies';
import { FormTheme, formContext } from '../../components/Form/FormContext';

const FormPageFooter = () => {
  const formContextProps = React.useContext(formContext);
  const context = React.useMemo(() => ({
    ...formContextProps,
    theme: FormTheme.Preview,
  }), [formContextProps]);

  return (
    <formContext.Provider value={context}>
      <Property
        label={form.footerGroup}
      />
    </formContext.Provider>
  );
};

FormPageFooter.type = form.Page;

FormPageFooter.topology = formFooterTopology;

export default register(FormPageFooter);
