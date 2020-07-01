import RDFTypes from '@rdfdev/prop-types';
import schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { anyRDFValue } from 'link-lib';
import {
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { convertKeysAtoB } from '../../helpers/data';
import { HTTP_RETRY_WITH, handleHTTPRetry } from '../../helpers/errorHandling';
import { retrievePath } from '../../helpers/iris';

class EntryPointBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  responseCallback() {} // eslint-disable-line class-methods-use-this

  submitHandler(form, values, ...args) {
    const {
      action,
      history,
      httpMethod,
      url,
      lrs,
    } = this.props;
    if (url && httpMethod?.value === 'GET') {
      return new Promise((resolve) => {
        history.push(retrievePath(url.value));

        resolve();
      });
    }
    const formApi = args[0];
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
    const formData = convertKeysAtoB(registeredValues);

    return lrs
      .exec(action, formData)
      .then((response) => {
        this.responseCallback(response);

        if (this.props.onDone) {
          this.props.onDone(response);
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
          if (this.props.onStatusForbidden) {
            return this.props.onStatusForbidden();
          }

          return lrs
            .actions
            .app
            .startSignIn(this.props.subject)
            .then(Promise.reject);
        }
        if (e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
          throw e;
        }

        return lrs
          .api
          .feedResponse(e.response)
          .then((statements) => {
            const name = anyRDFValue(statements, schema.text);
            if (name) {
              throw new Error(name.value);
            }
            throw e;
          });
      });
  }
}

EntryPointBase.propTypes = {
  action: RDFTypes.namedNode,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func,
  }),
  httpMethod: linkType,
  lrs: lrsType,
  onDone: PropTypes.func,
  onStatusForbidden: PropTypes.func,
  subject: subjectType,
  url: linkType,
};

export default EntryPointBase;
