import HttpStatus from 'http-status-codes';
import { anyRDFValue, namedNodeByIRI } from 'link-lib';
import {
  linkType,
  PropertyBase,
} from 'link-redux';
import PropTypes from 'prop-types';

import { convertKeysAtoB } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';

class EntryPointBase extends PropertyBase {
  constructor() {
    super();

    this.submitHandler = this.submitHandler.bind(this);
  }

  responseCallback() {} // eslint-disable-line class-methods-use-this

  submitHandler(values) {
    const formData = convertKeysAtoB(values);

    const { action, lrs } = this.props;

    return lrs
      .execActionByIRI(action, formData)
      .then((response) => {
        const target = lrs.getResourceProperty(action, NS.schema('target'));
        const targetCollection = lrs.getResourceProperty(target, NS.schema('url'));

        this.responseCallback(response);

        // TODO: This is shit.
        const u = new URL(targetCollection.value);
        const type = u.searchParams.get('type');
        u.searchParams.delete('type');
        u.searchParams.set('page', '1');
        if (type) {
          u.searchParams.set('type', type);
        }
        const first = namedNodeByIRI(u.toString());
        lrs.getEntity(targetCollection, { reload: true });
        lrs.getEntity(first, { reload: true });
        if (this.props.onDone) {
          this.props.onDone();
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

        return lrs.api
          .processor
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
}

EntryPointBase.propTypes = {
  invalid: PropTypes.bool,
  onStatusForbidden: PropTypes.func,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  url: linkType,
};

export default EntryPointBase;
