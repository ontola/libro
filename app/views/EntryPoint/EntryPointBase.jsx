import HttpStatus from 'http-status-codes';
import { anyRDFValue } from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { convertKeysAtoB } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';

const HTTP_RETRY_WITH = 449;

class EntryPointBase extends PropertyBase {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.footerGroupTheme = 'omniform';
  }

  responseCallback() {} // eslint-disable-line class-methods-use-this

  submitHandler(values) {
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
          const actionsHeader = e.response.headers.get('Exec-Action');
          if (__CLIENT__) {
            sessionStorage.setItem(
              `app.storedActions.${action.value}`,
              JSON.stringify({
                action,
                formData,
              })
            );
          }

          return lrs
            .api
            .execExecHeader(actionsHeader);
        }
        if (e.response.status === HttpStatus.UNAUTHORIZED) {
          if (this.props.onStatusForbidden) {
            return this.props.onStatusForbidden();
          }

          return lrs
            .actions
            .app
            .startSignIn(NamedNode.find(this.props.form))
            .then(Promise.reject);
        }
        if (e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
          throw e;
        }

        return lrs
          .api
          .feedResponse(e.response)
          .then((statements) => {
            const name = anyRDFValue(statements, NS.schema('text'));
            if (name) {
              throw new Error(name.value);
            }
            throw e;
          });
      });
  }

  footerGroup() {
    const { action, lrs } = this.props;

    const footerGroup = lrs.findSubject(
      action,
      [NS.schema('target'), NS.ll('actionBody'), NS.sh('property'), NS.sh('group')],
      NS.ontola('footerGroup')
    );

    if (footerGroup.length === 0) {
      return null;
    }

    return <LinkedResourceContainer subject={footerGroup.pop()} theme={this.footerGroupTheme} />;
  }
}

EntryPointBase.propTypes = {
  invalid: PropTypes.bool,
  onStatusForbidden: PropTypes.func,
  url: linkType,
};

export default EntryPointBase;
