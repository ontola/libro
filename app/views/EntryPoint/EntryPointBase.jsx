import RDFTypes from '@rdfdev/prop-types';
import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import HttpStatus from 'http-status-codes';
import { anyRDFValue } from 'link-lib';
import {
  Resource,
  lrsType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { convertKeysAtoB } from '../../helpers/data';
import { HTTP_RETRY_WITH, handleHTTPRetry } from '../../helpers/errorHandling';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';

class EntryPointBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.footerGroupTheme = 'omniform';
  }

  responseCallback() {} // eslint-disable-line class-methods-use-this

  submitHandler(form, values, ...args) {
    const formData = convertKeysAtoB(values);

    const { action, lrs } = this.props;

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
            .startSignIn(rdf.namedNode(this.props.form))
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

  footerGroupProp() {
    const { action, lrs } = this.props;

    const footerGroupProps = lrs.findSubject(
      action,
      [schema.target, ll.actionBody, sh.property, sh.group],
      ontola.footerGroup
    );

    if (footerGroupProps.length > 0) {
      return footerGroupProps.pop();
    }

    const footerGroupSteps = lrs.findSubject(
      action,
      [schema.target, ll.actionBody, ontola.formSteps, sh.group],
      ontola.footerGroup
    );

    return footerGroupSteps.pop();
  }

  footerGroup() {
    const prop = this.footerGroupProp();

    return prop && <Resource subject={prop} theme={this.footerGroupTheme} />;
  }
}

EntryPointBase.propTypes = {
  action: RDFTypes.namedNode,
  form: PropTypes.string,
  lrs: lrsType,
  onDone: PropTypes.func,
  onStatusForbidden: PropTypes.func,
};

export default EntryPointBase;
