import schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { anyRDFValue } from 'link-lib';
import { useLRS, useLink } from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import { convertKeysAtoB } from '../../helpers/data';
import { HTTP_RETRY_WITH, handleHTTPRetry } from '../../helpers/errorHandling';
import { retrievePath } from '../../helpers/iris';

const useSubmitHandler = ({
  modal,
  responseCallback,
  subject,
  onDone,
  onStatusForbidden,
}) => {
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

  return React.useCallback((form, values, ...args) => {
    let formData;
    if (url && httpMethod?.value === 'GET') {
      return new Promise((resolve) => {
        if (modal) {
          lrs.actions.ontola.showDialog(url);
        } else {
          history.push(retrievePath(url.value));
        }

        resolve();
      });
    }
    const formApi = args[0];
    if (formApi) {
      const registeredValues = {
        ...formApi.getRegisteredFields().reduce((res, key) => {
          if (!Object.keys(values).includes(key)) {
            return res;
          }

          return {
            ...res,
            [key]: values[key],
          };
        }, {}),
      };
      formData = convertKeysAtoB(registeredValues);
    }

    return lrs.exec(action, formData).then((response) => {
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
      if (e.response.status === HTTP_RETRY_WITH) {
        return handleHTTPRetry(lrs, e, () => form.onSubmit(values, ...args));
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

      return lrs.api.feedResponse(e.response).then((statements) => {
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
