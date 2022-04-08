import { Quadruple, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import HttpStatus from 'http-status-codes';
import { SomeNode, anyRDFValue } from 'link-lib';
import {
  useLRS,
  useResourceLink,
} from 'link-redux';
import React from 'react';

import { InputValue } from '../../components/FormField/FormFieldTypes';
import {
  HTTP_RETRY_WITH,
  SubmitDataProcessor,
  handleHTTPRetry,
} from '../../helpers/errorHandling';
import { isDifferentWebsite } from '../../helpers/iris';

export interface SubmitHandlerProps {
  entryPoint: SomeNode;
  formID: string;
  modal?: boolean;
  onDone?: (response: Response) => void;
  onStatusForbidden?: () => Promise<void>;
  responseCallback?: (response: Response) => void;
}

export interface FormValues {
  [index: string]: InputValue;
}
export type RetrySubmitHandler = () => Promise<void>;
export type SubmitHandler = (formData: FormValues, formApi?: FormApi<FormValues>, retrySubmit?: RetrySubmitHandler) =>
  Promise<void>;

const useSubmitHandler = ({
  entryPoint,
  formID,
  modal,
  responseCallback,
  onDone,
  onStatusForbidden,
}: SubmitHandlerProps): SubmitHandler => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const {
    action,
    httpMethod,
    url,
  } = useResourceLink(entryPoint, {
    action: schema.isPartOf,
    httpMethod: schema.httpMethod,
    url: schema.url,
  });

  return React.useCallback((formData, formApi, retrySubmit): Promise<void> => {
    if (url && httpMethod?.value === 'GET') {
      return new Promise<void>((resolve) => {
        if (modal) {
          lrs.actions.ontola.showDialog(url);
        } else if (isDifferentWebsite(url.value)) {
          lrs.actions.ontola.openWindow(url.value);
        } else {
          lrs.actions.ontola.navigate(url);
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

        return lrs.actions.app.startSignIn(entryPoint).then(() => Promise.reject(e));
      }

      if (e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
        throw e;
      }

      return lrs.api.feedResponse(e.response).then((statements: Quadruple[]) => {
        const name = anyRDFValue(statements, schema.text);

        if (name) {
          throw new Error(name.value);
        }

        throw e;
      });
    });
  }, [
    action,
    entryPoint,
    httpMethod,
    modal,
    responseCallback,
    url,
    onDone,
    onStatusForbidden,
  ]);
};

export default useSubmitHandler;
