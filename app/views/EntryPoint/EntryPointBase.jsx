import HttpStatus from 'http-status-codes';
import { anyRDFValue, namedNodeByIRI } from 'link-lib';
import {
  linkType,
  PropertyBase,
} from 'link-redux';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form/immutable';

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
        if (!e.response || e.response.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
          throw e;
        }

        return lrs.api
          .processor
          .feedResponse(e.response)
          .then((statements) => {
            const name = anyRDFValue(statements, NS.schema('text'));
            if (name) {
              throw new SubmissionError(name.value);
            }
            throw e;
          });
      });
  }
}

EntryPointBase.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  url: linkType,
};

export default EntryPointBase;
