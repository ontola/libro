import { SomeNode } from 'link-lib';
import React from 'react';

import { FormSection } from '../../../../Form/components/Form';
import { FormTheme } from '../../../../Form/components/Form/FormContext';
import { formFieldContext } from '../../../../Form/components/FormField/FormFieldContext';
import { JSONLDObject, idFromJSONLDObject } from '../../../../Form/lib/helpers';

import GrantInput from './GrantInput';
import { PermissionGroup } from './GrantsInput';

interface GrantInputWrapperProps {
  grantSetInput: SomeNode;
  grantsForm: SomeNode;
  permissionGroups: PermissionGroup[],
  index: number,
  value: JSONLDObject,
}

const GrantInputWrapper = ({
  grantsForm,
  grantSetInput,
  permissionGroups,
  index,
  value,
}: GrantInputWrapperProps): JSX.Element => {
  const { name } = React.useContext(formFieldContext);

  return (
    <FormSection
      formIRI={grantsForm}
      name={name}
      object={idFromJSONLDObject(value)}
      propertyIndex={index}
      theme={FormTheme.Preview}
    >
      <GrantInput
        grantSetInput={grantSetInput}
        permissionGroups={permissionGroups}
        value={value}
      />
    </FormSection>
  );
};

export default GrantInputWrapper;
