import HttpStatus from 'http-status-codes';
import { anyRDFValue } from 'link-lib';
import { LinkedResourceContainer, linkType, PropertyBase } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { convertKeysAtoB } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';

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
        const target = lrs.getResourceProperty(action, NS.schema('target'));
        const targetCollection = lrs.getResourceProperty(target, NS.schema('url'));

        this.responseCallback(response);

        // [AOD-303] TODO: This is shit.
        const u = new URL(targetCollection.value);
        const type = u.searchParams.get('type');
        u.searchParams.delete('type');
        u.searchParams.set('page', '1');
        if (type) {
          u.searchParams.set('type', type);
        } else {
          u.searchParams.set('type', 'paginated');
        }
        const first = NamedNode.find(u.toString());
        lrs.getEntity(targetCollection, { reload: true });
        lrs.getEntity(first, { reload: true });
        if (this.props.onDone) {
          this.props.onDone(response);
        }
        return Promise.resolve();
      }).catch((e) => {
        if (!e.response) {
          throw e;
        }
        if (this.props.onStatusForbidden && e.response.status === HttpStatus.UNAUTHORIZED) {
          return this.props.onStatusForbidden();
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
