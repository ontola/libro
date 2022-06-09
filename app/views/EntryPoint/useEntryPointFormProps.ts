import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { useIds, useValues } from 'link-redux';
import React from 'react';

import { EntryPointFormProps, ProvidedEntryPointProps } from '../../components/Form/EntryPointForm';
import ll from '../../ontology/ll';

import useSubmitHandler, { SubmitSuccessHandler } from './useSubmitHandler';

export interface EntryPointProps extends Partial<ProvidedEntryPointProps> {
  modal?: boolean;
  onDone?: SubmitSuccessHandler;
  onStatusForbidden?: () => Promise<void>;
}

const useEntryPointFormProps = (entryPoint: SomeNode, props: Partial<EntryPointProps>): EntryPointFormProps => {
  const [action] = useIds(entryPoint, schema.isPartOf);
  const [actionBody] = useIds(entryPoint, ll.actionBody);
  const [httpMethod] = useValues(entryPoint, schema.httpMethod);
  const [url] = useValues(entryPoint, schema.url);

  const [object] = useIds(action, schema.object);

  const formURL = new URL(entryPoint.value);
  const formID = props.formID ?? [formURL.origin, formURL.pathname].join('');

  const {
    modal,
    onDone,
    onStatusForbidden,
  } = props;

  const onSubmit = useSubmitHandler({
    entryPoint,
    formID,
    modal,
    onDone,
    onStatusForbidden,
  });

  return {
    Wrapper: React.Fragment,
    action,
    actionBody,
    autoSubmit: props.autoSubmit || false,
    autofocusForm: props.autofocusForm ?? true,
    blacklist: props.blacklist,
    formID,
    formInstance: props.formInstance,
    httpMethod,
    object,
    onKeyUp: props.onKeyUp,
    onSubmit,
    sessionStore: props.sessionStore ?? sessionStorage,
    url,
    whitelist: props.whitelist,
  };
};

export default useEntryPointFormProps;
