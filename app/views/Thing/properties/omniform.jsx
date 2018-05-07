import HttpStatus from 'http-status-codes';
import { Set } from 'immutable';
import LinkedRenderStore, { anyRDFValue, namedNodeByIRI } from 'link-lib';
import {
  link,
  linkedPropType,
  PropertyBase,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form/immutable';

import {
  Card,
  Omniform,
  OmniformPreview,
} from '../../../components';
import { allTopologiesExcept, NS } from '../../../helpers/LinkedRenderStore';
import { highlightResource } from '../../../state/app/actions';
import {
  getOmniformOpenState,
  omniformCloseInline,
  omniformOpenInline,
} from '../../../state/omniform';

const KEY_ESCAPE = 27;

const propTypes = {
  onDone: PropTypes.func,
  subject: subjectType,
  target: linkedPropType,
  type: linkedPropType,
  votesProCount: PropTypes.number,
};

class OmniformProp extends PropertyBase {
  constructor(props) {
    super(props);

    this.submitContent = this.submitContent.bind(this);
  }

  submitContent(data, formData) {
    const { linkedRenderStore: lrs } = this.context;

    const action = data.selectedAction;

    return lrs
      .execActionByIRI(action, formData)
      .then((response) => {
        const target = lrs.getResourceProperty(action, NS.schema('target'));
        const targetCollection = lrs.getResourceProperty(target, NS.schema('url'));

        this.props.highlightResource(response.iri);
        // TODO: This is shit.
        const u = new URL(targetCollection.value);
        const type = u.searchParams.get('type');
        u.searchParams.delete('type');
        u.searchParams.set('page', '1');
        u.searchParams.set('type', type);
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

  /* We need to encode the IRI's to prevent redux-forms from parsing the dots as sub-resources */
  reduxFormsSafeIRI() {
    return btoa(this.props.subject);
  }

  render() {
    return (
      <Omniform
        actions={new Set(this.props.operation)}
        parentIRI={this.reduxFormsSafeIRI()}
        submitHandler={this.submitContent}
        onKeyUp={this.props.onKeyUp}
      />
    );
  }
}


OmniformProp.propTypes = propTypes;

const ReduxOmniformProp = connect(null, dispatch => ({
  highlightResource: iri => dispatch(highlightResource(iri.value))
}))(OmniformProp);

const ConnectedOmniformProp = link({
  operation: {
    label: NS.hydra('operation'),
    limit: Infinity,
  },
})(ReduxOmniformProp);

class CollapsedOmniformProp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  toggle() {
    if (this.props.opened) {
      this.props.closeForm();
    } else {
      this.props.openForm();
    }
  }

  handleKey(e) {
    if (e.keyCode === KEY_ESCAPE) {
      this.props.closeForm();
    }
  }

  render() {
    if (this.props.opened) {
      return (
        <ConnectedOmniformProp
          onDone={this.toggle}
          onKeyUp={this.handleKey}
          {...this.props}
        />
      );
    }

    return this.props.clickToOpen ? <OmniformPreview onClick={this.toggle} /> : null;
  }
}

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

CollapsedOmniformProp.propTypes = {
  clickToOpen: PropTypes.bool,
  closeForm: PropTypes.func,
  openForm: PropTypes.func,
  opened: PropTypes.bool.isRequired,
};

const mapInlineStateToProps = (state, ownProps) => ({
  opened: getOmniformOpenState(state, ownProps.subject)
});

const mapInlineDispatchToProps = (dispatch, ownProps) => ({
  closeForm: () => Promise.resolve(dispatch(omniformCloseInline(ownProps.subject))),
  openForm: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.subject))),
});

export default [
  LinkedRenderStore.registerRenderer(
    ({ subject }) => <Card><ConnectedOmniformProp opened subject={subject} /></Card>,
    [NS.schema('Thing'), NS.link('Document')],
    NS.app('omniform'),
    allTopologiesExcept(NS.argu('card'), NS.argu('cardAppendix'))
  ),
  LinkedRenderStore.registerRenderer(
    connect(mapInlineStateToProps, mapInlineDispatchToProps)(CollapsedOmniformProp),
    [NS.schema('Thing'), NS.link('Document')],
    NS.app('omniform'),
    [NS.argu('card'), NS.argu('cardAppendix')]
  ),
];
