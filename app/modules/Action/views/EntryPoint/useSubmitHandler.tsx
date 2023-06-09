import {
  NamedNode,
  Quadruple,
  isNamedNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import HttpStatus from 'http-status-codes';
import {
  LinkedActionResponse,
  SomeNode,
  anyRDFValue,
} from 'link-lib';
import { useLRS, useResourceLink } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { StartSignIn } from '../../../Auth/middleware/actions';
import { errorMessages } from '../../../../translations/messages';
import {
  HTTP_RETRY_WITH,
  SubmitDataProcessor,
  handleHTTPRetry,
} from '../../../Common/lib/errorHandling';
import { isDifferentWebsite } from '../../../Common/lib/iris';
import {
  Navigate,
  OpenWindow,
  ShowDialog,
  ShowSnackbar,
} from '../../../Common/middleware/actions';
import { InputValue } from '../../../Form/components/FormField/FormFieldTypes';
import { clearFormStorage } from '../../../Form/lib/helpers';
import libro from '../../../Kernel/ontology/libro';

export interface SubmitHandlerProps {
  entryPoint: SomeNode;
  formID: string;
  modal?: boolean;
  onDone?: SubmitSuccessHandler;
  onStatusForbidden?: () => Promise<void>;
}

export interface FormValues {
  [index: string]: InputValue;
}

export type RetrySubmitHandler = () => Promise<void>;
export type SubmitHandler = (formData: FormValues, formApi?: FormApi<FormValues>, retrySubmit?: RetrySubmitHandler) =>
  Promise<void>;
export type SubmitSuccessHandler = (response: LinkedActionResponse) => void;

const useSubmitHandler = ({
  entryPoint,
  formID,
  modal,
  onDone,
  onStatusForbidden,
}: SubmitHandlerProps): SubmitHandler => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const intl = useIntl();

  const {
    action,
    httpMethod,
    target,
    url,
  } = useResourceLink(entryPoint, {
    action: schema.isPartOf,
    httpMethod: schema.httpMethod,
    target: libro.target,
    url: schema.url,
  });

  return React.useCallback((formData, formApi, retrySubmit): Promise<void> => {
    if (url && httpMethod?.value === 'GET') {
      return new Promise<void>((resolve) => {
        if (modal) {
          lrs.actions.get(ShowDialog)(url as SomeNode);
        } else if (target?.value == '_blank' || isDifferentWebsite(url.value)) {
          lrs.actions.get(OpenWindow)(url.value);
        } else {
          lrs.actions.get(Navigate)(url as NamedNode);
        }

        resolve();
      });
    }

    if (!isNamedNode(action)) {
      return Promise.reject();
    }

    return lrs.exec(action, formData).then((response: LinkedActionResponse) => {
      if (formApi) {
        clearFormStorage(formID);

        window.setTimeout(() => formApi?.reset(), 0);
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

        return lrs.actions.get(StartSignIn)(entryPoint as NamedNode).then(() => Promise.reject(e));
      }

      if (e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
        lrs.actions.get(ShowSnackbar)(intl.formatMessage(errorMessages['500/body']));

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
    url,
    onDone,
    onStatusForbidden,
  ]);
};

export default useSubmitHandler;
