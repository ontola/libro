import * as sh from '@ontologies/shacl';
import {
  FC,
  dig,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import AssociationInput from '../../components/Input/AssociationInput';
import { useItemFactory } from '../../components/Input/AssociationInput/lib/useItemFactory';
import { formFieldsPath } from '../../helpers/diggers';
import useFormField from '../../hooks/useFormField';
import argu from '../../ontology/argu';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const AssociationFormField: FC = ({
  subject,
}) => {
  const newItem = useItemFactory();

  const fieldProps = useFormField(subject, {
    alwaysVisible: false,
    newItem,
  });
  const paths = useIds(fieldProps.field, dig(form.form, ...formFieldsPath, sh.path));

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      className={fieldProps.className}
      inputComponent={AssociationInput}
      label={fieldProps.values.length > 0 ? fieldProps.label : undefined}
      sortable={paths.includes(argu.order)}
    />
  );
};

AssociationFormField.type = form.AssociationInput;

AssociationFormField.topology = formFieldTopologies;

export default register(AssociationFormField);
