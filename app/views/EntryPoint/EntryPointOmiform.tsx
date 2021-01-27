import { isNode, Literal, NamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useResourceProperty,
} from 'link-redux';
import React, { EventHandler } from 'react';

import ll from '../../ontology/ll';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

interface PropTypes {
  action: SomeNode;
  actionBody: SomeNode;
  autofocusForm: boolean;
  footerButtons: (submitting: boolean) => React.ReactNode;
  formInstance: any;
  httpMethod: Literal;
  modal?: boolean;
  responseCallback?: (response: any) => void;
  onDone?: (response: any) => void;
  onKeyUp: EventHandler<any>;
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
    footerButtons,
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
    subject: subject!!,
  });
  const [object] = useResourceProperty(action, schema.object);

  return (
    <EntryPointForm
      action={action}
      actionBody={actionBody}
      autofocusForm={autofocusForm}
      footerButtons={footerButtons}
      formID={formID}
      formInstance={formInstance}
      httpMethod={httpMethod?.value}
      object={isNode(object) ? object : undefined}
      sessionStore={sessionStore}
      theme="preview"
      url={url?.value}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
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
