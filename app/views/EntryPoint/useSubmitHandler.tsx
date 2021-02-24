import { isNamedNode, Quad } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import HttpStatus from 'http-status-codes';
import { anyRDFValue, SomeNode } from 'link-lib';
import { useLink, useLRS } from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import { handleHTTPRetry, HTTP_RETRY_WITH } from '../../helpers/errorHandling';
import { retrievePath } from '../../helpers/iris';
import { InputValue } from '../../hooks/useFormField';

interface PropTypes {
  formID: string;
  modal?: boolean;
  onDone?: (response: any) => void;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: any) => void;
  subject: SomeNode;
}

export interface FormValues {
  [index: string]: InputValue;
}
export type RetrySubmitHandler = () => Promise<any>;
export type SubmitHandler = (formData: FormValues, formApi?: FormApi<FormValues>, retrySubmit?: RetrySubmitHandler) =>
  Promise<any>;

const useSubmitHandler = ({
  formID,
  modal,
  responseCallback,
  subject,
  onDone,
  onStatusForbidden,
}: PropTypes) => {
  const lrs = useLRS();
  const history = useHistory();
  const {
    action,
    httpMethod,
    url,
  } = useLink({
    action: schema.isPartOf,
    httpMethod: schema.httpMethod,
    url: schema.url,
  });

  return React.useCallback((formData, formApi, retrySubmit) => {
    if (url && httpMethod?.value === 'GET') {
      return new Promise<void>((resolve) => {
        if (modal) {
          lrs.actions.ontola.showDialog(url);
        } else {
          history.push(retrievePath(url.value));
        }

        resolve();
      });
    }

    if (!isNamedNode(action)) {
      return Promise.reject();
    }

    return lrs.exec(action, formData).then((response) => {
      if (formApi) {
        if (__CLIENT__) {
          Object.keys(sessionStorage).forEach((k) => k.startsWith(formID) && sessionStorage.removeItem(k));
        }

        window.setTimeout(() => formApi?.reset(), 0);
      }

      if (responseCallback) {
        responseCallback(response);
      }

      if (onDone) {
        onDone(response);
      }

      return Promise.resolve();
    }).catch((e) => {
      if (!e.response) {
        throw e;
      }
      if (e.response.status === HTTP_RETRY_WITH && retrySubmit) {
        return handleHTTPRetry(lrs, e, () => retrySubmit());
      }
      if (e.response.status === HttpStatus.UNAUTHORIZED) {
        if (onStatusForbidden) {
          return onStatusForbidden();
        }

        return lrs.actions.app.startSignIn(subject).then(() => Promise.reject(e));
      }
      if (e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
        throw e;
      }

      return (lrs.api as any).feedResponse(e.response).then((statements: Quad[]) => {
        const name = anyRDFValue(statements, schema.text);
        if (name) {
          throw new Error(name.value);
        }
        throw e;
      });
    });
  }, [
    action,
    httpMethod,
    modal,
    responseCallback,
    subject,
    url,
    onDone,
    onStatusForbidden,
  ]);
};

export default useSubmitHandler;