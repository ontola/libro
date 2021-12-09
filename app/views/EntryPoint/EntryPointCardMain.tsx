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
import { useHistory } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import EntryPointForm from '../../components/Form/EntryPointForm';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import FormFooter from '../../topologies/FormFooter';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';

interface EntryPointCardMainProps extends EntryPointProps {
  onCancel: EventHandler<SyntheticEvent<unknown>>;
}

const EntryPointCardMain: FC<EntryPointCardMainProps> = ({
  onCancel,
  subject,
  ...otherProps
}) => {
  const history = useHistory();
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);
  const [name] = useStrings(schema.name);

  const footer = (loading: boolean) => (
    <FormFooter>
      <Property label={ll.actionBody} />
      <FormFooterRight
        loading={loading}
        submitLabel={name}
        onCancel={onCancel ?? history.goBack}
      />
    </FormFooter>
  );

  return (
    <React.Fragment>
      <CardContent endSpacing>
        <Property label={schema.text} />
        <EntryPointForm
          {...entryPointFormProps}
          footer={footer}
        />
      </CardContent>
    </React.Fragment>
  );
};

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

export default register(EntryPointCardMain);
