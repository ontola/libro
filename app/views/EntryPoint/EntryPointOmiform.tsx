import {
  NamedNode,
  isNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import {
  FC,
  register,
  useProperty,
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
  autofocusForm: boolean;
  footer: (submitting: boolean) => React.ReactNode;
  formInstance: FormApi;
  modal?: boolean;
  responseCallback?: (response: unknown) => void;
  onDone?: (response: unknown) => void;
  onKeyUp: EventHandler<SyntheticEvent<unknown>>;
  onStatusForbidden?: () => Promise<void>;
  parentIRI: string;
  sessionStore: Storage;
  /** The ids of the whitelisted properties */
  whitelist: number[];
}

const EntryPointOmniform: FC<PropTypes> = ({
  autofocusForm,
  footer,
  formInstance,
  modal,
  onDone,
  onKeyUp,
  onStatusForbidden,
  parentIRI,
  responseCallback,
  sessionStore,
  subject,
  whitelist,
}) => {
  const [action] = useProperty(schema.isPartOf) as NamedNode[];
  const [actionBody] = useProperty(ll.actionBody) as NamedNode[];
  const [httpMethod] = useProperty(schema.httpMethod);
  const [url] = useProperty(schema.url);

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
      onLoad={() => (
        <CardContent>
          <LoadingGridContent />
        </CardContent>
      )}
      onSubmit={submitHandler}
    />
  );
};

EntryPointOmniform.type = schema.EntryPoint;

EntryPointOmniform.topology = omniformFieldsTopology;

export default register(EntryPointOmniform);
