import rdf, { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { Set } from 'immutable';
import {
  Property,
  Resource,
  subjectType,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import argu from '../../ontology/argu';
import { highlightResource } from '../../state/app/actions';
import { getOmniformAction, omniformSetAction } from '../../state/omniform';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
import EntryPointBase from '../../views/EntryPoint/EntryPointBase';
import { filterActions } from '../../views/Thing/properties/omniform/helpers';
import Button from '../Button';
import { FormFooterRight } from '../Form';
import { formFieldError } from '../FormField';

import './Omniform.scss';

const propTypes = {
  // The NamedNode of the currently selected form.
  action: subjectType,
  actions: PropTypes.instanceOf(Set).isRequired,
  autofocusForm: PropTypes.bool,
  error: formFieldError,
  formFooterButtons: PropTypes.node,
  formInstance: PropTypes.objectOf(PropTypes.any),
  // From redux-forms
  invalid: PropTypes.bool,
  onActionChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  onStatusForbidden: PropTypes.func,
  parentIRI: PropTypes.string,
};

const PROPS_WHITELIST = [
  schema.name,
  schema.text,
  schema.location,
  argu.attachments,
  argu.isOpinion,
].map((t) => rdf.id(t));

const convertFieldContext = (parentIRI, actionIRI) => {
  const omniformKey = `${atob(parentIRI)}.omniform`;
  Array(sessionStorage.length)
    .fill(null)
    .map((_, i) => sessionStorage.key(i))
    .filter((key) => key.startsWith(omniformKey))
    .forEach((key) => {
      const newKey = key.replace(omniformKey, actionIRI.value);
      const value = sessionStorage.getItem(key);
      sessionStorage.setItem(newKey, value);
      sessionStorage.removeItem(key);
    });
};

class Omniform extends EntryPointBase {
  action() {
    return this.props.action;
  }

  linkedFieldset() {
    const {
      action,
      closeForm,
      formInstance,
      lrs,
      onKeyUp,
      parentIRI,
    } = this.props;
    if (!isNamedNode(action)) {
      return null;
    }
    const object = lrs.getResourceProperty(action, schema.object);
    const types = this.types();

    const footerButtons = (loading) => (
      <React.Fragment>
        {types}
        <FormFooterRight>
          <Button
            theme="transparant"
            onClick={closeForm}
          >
            <FormattedMessage id="https://app.argu.co/i18n/forms/actions/cancel" />
          </Button>
          <Button
            loading={loading}
            theme="submit"
            type="submit"
          >
            <FormattedMessage
              defaultMessage="save"
              id="https://app.argu.co/i18n/actions/labels/save"
            />
          </Button>
        </FormFooterRight>
      </React.Fragment>
    );

    return (
      <Resource subject={action}>
        <Property
          forceRender
          autofocusForm={this.props.autofocusForm}
          footerButtons={footerButtons}
          formInstance={formInstance}
          label={schema.target}
          object={object}
          parentIRI={parentIRI}
          sessionStore={this.props.sessionStore}
          whitelist={PROPS_WHITELIST}
          onCancel={this.props.onCancel}
          onDone={this.props.onDone}
          onKeyUp={onKeyUp}
          onStatusForbidden={this.props.onStatusForbidden}
        />
      </Resource>
    );
  }

  responseCallback(response) {
    if (response.iri) {
      this.props.highlightResource(response.iri);
    }
  }

  types() {
    return this
      .props
      .actions
      .map((iri) => (
        <Resource key={iri} subject={iri}>
          <Property
            current={rdf.equals(iri, this.props.action)}
            label={schema.result}
            onClick={this.props.onActionChange(iri)}
          />
        </Resource>
      ));
  }

  render() {
    const {
      actions,
      action,
      error,
    } = this.props;

    if (actions.length === 0) {
      return null;
    }

    const types = this.types();

    if (!action || types.size === 0) {
      return null;
    }

    return (
      <React.Fragment>
        {error && (
          <div className="Omniform__error">
            <FontAwesome name="exclamation-triangle" />
            {error}
          </div>
        )}
        <OmniformFields>
          {this.linkedFieldset()}
        </OmniformFields>
      </React.Fragment>
    );
  }
}

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const actions = filterActions(ownProps.lrs, ownProps.actions);

  const action = getOmniformAction(state, ownProps.parentIRI) || actions.first();

  return ({
    action,
    actions,
    onStatusForbidden: () => {
      convertFieldContext(ownProps.parentIRI, action);
      ownProps.lrs.actions.ontola.navigate(action);

      return ownProps
        .lrs
        .actions
        .app
        .startSignIn(action)
        .then(Promise.reject);
    },
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  highlightResource: (iri) => dispatch(highlightResource(iri.value)),
  onActionChange: (action) => () => {
    dispatch(omniformSetAction({
      action,
      parentIRI: props.parentIRI,
    }));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const OmniformContainer = withLRS(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Omniform));

export default OmniformContainer;
