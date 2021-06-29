import {
  Literal,
  NamedNode,
  isNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useResourceProperty,
} from 'link-redux';
import React, { EventHandler, SyntheticEvent } from 'react';

import CardContent from '../../components/Card/CardContent';
import { LoadingGridContent } from '../../components/Loading';
import ll from '../../ontology/ll';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

interface PropTypes {
  action: SomeNode;
  actionBody: SomeNode;
  autofocusForm: boolean;
  footer: (submitting: boolean) => React.ReactNode;
  formInstance: FormApi;
  httpMethod: Literal;
  modal?: boolean;
  responseCallback?: (response: unknown) => void;
  onDone?: (response: unknown) => void;
  onKeyUp: EventHandler<SyntheticEvent<unknown>>;
  onStatusForbidden?: () => Promise<void>;
  parentIRI: string;
  sessionStore: Storage;
  url: NamedNode;
  /** The ids of the whitelisted properties */
  whitelist: number[];
}

const EntryPointOmniform: FC<PropTypes> = (props) => {
  const {
    action,
    actionBody,
    autofocusForm,
    footer,
    formInstance,
    httpMethod,
    modal,
    onDone,
    onKeyUp,
    onStatusForbidden,
    parentIRI,
    responseCallback,
    sessionStore,
    subject,
    url,
    whitelist,
  } = props;
  const formID = `${atob(parentIRI)}.omniform`;
  const submitHandler = useSubmitHandler({
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
    subject: subject!,
  });
  const [object] = useResourceProperty(action, schema.object);

  return (
    <EntryPointForm
      action={action}
      actionBody={actionBody}
      autofocusForm={autofocusForm}
      footer={footer}
      formID={formID}
      formInstance={formInstance}
      httpMethod={httpMethod?.value}
      object={isNode(object) ? object : undefined}
      sessionStore={sessionStore}
      theme="preview"
      url={url?.value}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
      onLoad={() => <CardContent><LoadingGridContent /></CardContent>}
      onSubmit={submitHandler}
    />
  );
};

EntryPointOmniform.type = schema.EntryPoint;

EntryPointOmniform.topology = omniformFieldsTopology;

EntryPointOmniform.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointOmniform);
