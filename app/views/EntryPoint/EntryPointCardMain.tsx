import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React, {
  EventHandler,
  SyntheticEvent,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import Button, { ButtonTheme } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import EntryPointForm from '../../components/Form/EntryPointForm';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import FormFooter from '../../topologies/FormFooter';
import { mainBodyTopology } from '../../topologies/MainBody';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';

interface EntryPointCardMainProps extends EntryPointProps {
  cancelPath: string;
  onCancel: EventHandler<SyntheticEvent<unknown>>;
}

const EntryPointCardMain: FC<EntryPointCardMainProps> = ({
  cancelPath,
  onCancel,
  subject,
  ...otherProps
}) => {
  const history = useHistory();
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);
  const [name] = useProperty(schema.name);
  const onCancelClick = React.useCallback((e) => {
    e.preventDefault();

    if (onCancel) {
      onCancel(e);
    } else {
      history.goBack();
    }
  }, [onCancel]);

  const cancelButton = cancelPath && (
    <Button
      href={cancelPath}
      theme={ButtonTheme.Transparent}
      onClick={onCancelClick}
    >
      <FormattedMessage
        defaultMessage="cancel"
        id="https://app.argu.co/i18n/forms/actions/cancel"
      />
    </Button>
  );

  const footer = (loading: boolean) => (
    <FormFooter>
      <Property label={ll.actionBody} />
      <FormFooterRight>
        {cancelButton}
        <Button
          loading={loading}
          type="submit"
        >
          {name?.value}
        </Button>
      </FormFooterRight>
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
  mainBodyTopology,
];

export default register(EntryPointCardMain);
