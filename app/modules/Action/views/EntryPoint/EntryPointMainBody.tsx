import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';

import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import ll from '../../../Core/ontology/ll';
import EntryPointForm from '../../../Form/components/Form/EntryPointForm';
import FormFooterRight from '../../../Form/components/Form/FooterRight';
import FormFooter from '../../../Form/topologies/FormFooter';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';
import { useFormCancel } from './useFormCancel';

interface EntryPointMainBodyProps extends EntryPointProps {
  hideCancel?: boolean;
  onCancel: EventHandler<SyntheticEvent<unknown>>;
}

const EntryPointMainBody: FC<EntryPointMainBodyProps> = ({
  hideCancel,
  onCancel,
  subject,
  ...otherProps
}) => {
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);
  const handleCancel = useFormCancel(entryPointFormProps.formID, onCancel);
  const [name] = useStrings(schema.name);

  const footer = (loading: boolean | undefined) => (
    <FormFooter>
      <Property label={ll.actionBody} />
      <FormFooterRight
        loading={loading}
        submitLabel={name}
        onCancel={hideCancel ? undefined : handleCancel}
      />
    </FormFooter>
  );

  return (
    <React.Fragment>
      <Property label={schema.text} />
      <EntryPointForm
        {...entryPointFormProps}
        footer={footer}
      />
    </React.Fragment>
  );
};

EntryPointMainBody.type = schema.EntryPoint;

EntryPointMainBody.topology = [
  mainBodyTopology,
];

export default register(EntryPointMainBody);
