import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { ReturnType, useResourceProperty } from 'link-redux';

import { EntryPointFormProps, ProvidedEntryPointProps } from '../../components/Form/EntryPointForm';
import ll from '../../ontology/ll';

import useSubmitHandler from './useSubmitHandler';

export interface EntryPointProps extends Partial<ProvidedEntryPointProps> {
  modal?: boolean;
  onDone?: (response: Response) => void;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: Response) => void;
}

const useEntryPointFormProps = (entryPoint: SomeNode, props: Partial<EntryPointProps>): EntryPointFormProps => {
  const [action] = useResourceProperty(entryPoint, schema.isPartOf).filter(isNode);
  const [actionBody] = useResourceProperty(entryPoint, ll.actionBody).filter(isNode);
  const httpMethod = useResourceProperty(entryPoint, schema.httpMethod, { returnType: ReturnType.Value });
  const url = useResourceProperty(entryPoint, schema.url, { returnType: ReturnType.Value });

  const [object] = useResourceProperty(action, schema.object).filter(isNode);

  const formURL = new URL(entryPoint.value);
  const formID = props.formID ?? [formURL.origin, formURL.pathname].join('');

  const {
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
  } = props;

  const onSubmit = useSubmitHandler({
    entryPoint,
    formID,
    modal,
    onDone,
    onStatusForbidden,
    responseCallback,
  });

  return {
    action,
    actionBody,
    autoSubmit: props.autoSubmit || false,
    autofocusForm: props.autofocusForm || false,
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
