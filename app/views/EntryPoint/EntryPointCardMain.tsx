import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React, {
  EventHandler,
  SyntheticEvent,
} from 'react';

import EntryPointForm from '../../components/Form/EntryPointForm';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardMainTopology, cardTopology } from '../../topologies';
import FormFooter from '../../topologies/FormFooter';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';
import { useFormCancel } from './useFormCancel';

interface EntryPointCardMainProps extends EntryPointProps {
  onCancel: EventHandler<SyntheticEvent<unknown>>;
}

const EntryPointCardMain: FC<EntryPointCardMainProps> = ({
  onCancel,
  subject,
  ...otherProps
}) => {
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);
  const handleCancel = useFormCancel(entryPointFormProps.formID, onCancel);
  const [name] = useStrings(schema.name);

  const footer = (loading: boolean) => (
    <FormFooter>
      <Property label={ll.actionBody} />
      <FormFooterRight
        loading={loading}
        submitLabel={name}
        onCancel={handleCancel}
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

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

export default register(EntryPointCardMain);
