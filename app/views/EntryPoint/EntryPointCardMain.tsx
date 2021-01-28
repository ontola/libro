import { isNode, Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useResourceProperty,
} from 'link-redux';
import React, { EventHandler } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import Button, { ButtonTheme } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import FormFooterRight from '../../components/Form/FooterRight';
import ll from '../../ontology/ll';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

interface PropTypes {
  action: SomeNode;
  actionBody: SomeNode;
  autoSubmit: boolean;
  blacklist?: number[];
  cancelPath: string;
  httpMethod: Literal;
  modal?: boolean;
  name: Literal;
  onCancel: EventHandler<any>;
  onDone?: (response: any) => void;
  onKeyUp: EventHandler<any>;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: any) => void;
  sessionStore: Storage;
  url: SomeNode;
  whitelist?: number[];
}

const EntryPointCardMain: FC<PropTypes> = (props) => {
  const {
    action,
    actionBody,
    autoSubmit,
    blacklist,
    httpMethod,
    cancelPath,
    modal,
    name,
    onCancel,
    onDone,
    onStatusForbidden,
    responseCallback,
    sessionStore,
    subject,
    url,
    whitelist,
  } = props;
  const history = useHistory();
  const formURL = new URL(subject!!.value);
  const formID = [formURL.origin, formURL.pathname].join('');
  const submitHandler = useSubmitHandler({
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
    subject: subject!!,
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

  const footerButtons = (loading: boolean) => (
    <FormFooterRight>
      {cancelButton}
      <Button
        loading={loading}
        theme={ButtonTheme.Submit}
        type="submit"
      >
        {name?.value}
      </Button>
    </FormFooterRight>
  );

  return (
    <React.Fragment>
      <CardContent>
        <Property label={schema.text} />
      </CardContent>
      <EntryPointForm
        autofocusForm
        action={action}
        actionBody={actionBody}
        autoSubmit={autoSubmit}
        blacklist={blacklist}
        contentWrapper={CardContent}
        footerButtons={footerButtons}
        formID={formID}
        httpMethod={httpMethod?.value}
        object={isNode(object) ? object : undefined}
        sessionStore={sessionStore}
        url={url?.value}
        whitelist={whitelist}
        onKeyUp={undefined}
        onSubmit={submitHandler}
      />
    </React.Fragment>
  );
};

EntryPointCardMain.type = schema.EntryPoint;

EntryPointCardMain.topology = [
  cardTopology,
  cardMainTopology,
];

EntryPointCardMain.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  errorResponse: ll.errorResponse,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointCardMain);
