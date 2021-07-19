import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import Button, { ButtonTheme } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import FormFooter from '../../topologies/FormFooter';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

interface PropTypes {
  autoSubmit: boolean;
  blacklist?: number[];
  cancelPath: string;
  modal?: boolean;
  onCancel: EventHandler<SyntheticEvent<unknown>>;
  onDone?: (response: Response) => void;
  onKeyUp: EventHandler<SyntheticEvent<unknown>>;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: Response) => void;
  sessionStore: Storage;
  whitelist?: number[];
}

const EntryPointCardMain: FC<PropTypes> = ({
  autoSubmit,
  blacklist,
  cancelPath,
  modal,
  onCancel,
  onDone,
  onStatusForbidden,
  responseCallback,
  sessionStore,
  subject,
  whitelist,
}) => {
  const [action] = useProperty(schema.isPartOf) as SomeNode[];
  const [actionBody] = useProperty(ll.actionBody) as SomeNode[];
  const [httpMethod] = useProperty(schema.httpMethod);
  const [name] = useProperty(schema.name);
  const [url] = useProperty(schema.url);
  const history = useHistory();
  const formURL = new URL(subject!.value);
  const formID = [formURL.origin, formURL.pathname].join('');
  const submitHandler = useSubmitHandler({
    entryPoint: subject!,
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
  });
  const onCancelClick = React.useCallback((e) => {
    e.preventDefault();

    if (onCancel) {
      onCancel(e);
    } else {
      history.goBack();
    }
  }, [onCancel]);
  const [object] = useResourceProperty(action, schema.object);

  const cancelButton = cancelPath && (
    <Button
      href={cancelPath}
      theme={ButtonTheme.Transparant}
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
          autofocusForm
          action={action}
          actionBody={actionBody}
          autoSubmit={autoSubmit}
          blacklist={blacklist}
          footer={footer}
          formID={formID}
          httpMethod={httpMethod?.value}
          object={isNode(object) ? object : undefined}
          sessionStore={sessionStore}
          url={url?.value}
          whitelist={whitelist}
          onKeyUp={undefined}
          onSubmit={submitHandler}
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
