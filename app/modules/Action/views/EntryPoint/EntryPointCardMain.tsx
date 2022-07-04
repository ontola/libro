import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import ll from '../../../Kernel/ontology/ll';
import EntryPointForm from '../../../Form/components/Form/EntryPointForm';
import FormFooterRight from '../../../Form/components/Form/FooterRight';
import FormFooter from '../../../Form/topologies/FormFooter';

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
  const theme = useTheme<LibroTheme>();
  const screenIsNarrow = useMediaQuery(theme.breakpoints.down('md'));

  const footer = (loading: boolean | undefined) => (
    <FormFooter>
      <Property label={ll.actionBody} />
      <FormFooterRight
        crammed={screenIsNarrow}
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
