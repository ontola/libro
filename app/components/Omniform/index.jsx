import { Set } from 'immutable';
import {
  LinkedResourceContainer,
  Property,
  subjectType,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { Form } from 'informed';
import { formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { filterSort } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';
import { highlightResource } from '../../state/app/actions';
import {
  getOmniformAction,
  omniformSetAction,
} from '../../state/omniform';
import EntryPointBase from '../../views/EntryPoint/EntryPointBase';
import Button from '../Button';
import { FormFooter, FormFooterRight } from '../Form';

import './Omniform.scss';
import OmniformFields from './OmniformFields';

const propTypes = {
  // The NamedNode of the currently selected form.
  action: subjectType,
  actions: PropTypes.instanceOf(Set).isRequired,
  error: PropTypes.string,
  // Unique name of the form
  form: PropTypes.string.isRequired,
  // From redux-form
  invalid: PropTypes.bool,
  onActionChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
};

const FILTER = [
  /\/v\/new$/,
  /\/actions\/destroy_vote$/,
  /\/actions\/create_vote/,
  /\/blog\/new$/,
  /\/v\/delete$/,
];
const ORDER = [
  '/m/new',
  '/c/new',
  '/pros/new',
  '/cons/new',
];

class Omniform extends EntryPointBase {
  action() {
    return this.props.action;
  }

  shouldComponentUpdate() {
    // TODO
    return true;
  }

  linkedFieldset() {
    const { action, form, onKeyUp } = this.props;
    if (!(action instanceof NamedNode)) {
      return null;
    }

    const PROPS_WHITELIST = [
      NS.schema('name'),
      NS.schema('text'),
    ];

    return (
      <LinkedResourceContainer subject={action}>
        <Property
          forceRender
          formName={form}
          label={NS.schema('target')}
          whitelist={PROPS_WHITELIST}
          onKeyUp={onKeyUp}
        />
      </LinkedResourceContainer>
    );
  }

  responseCallback(response) {
    this.props.highlightResource(response.iri);
  }

  types() {
    return this
      .props
      .actions
      .map(iri => (
        <LinkedResourceContainer key={iri} subject={iri}>
          <Property
            current={iri === this.props.action}
            label={NS.schema('result')}
            onClick={this.props.onActionChange(iri)}
          />
        </LinkedResourceContainer>
      ));
  }

  render() {
    const {
      actions,
      action,
      error,
      invalid,
    } = this.props;

    if (actions.length === 0) {
      return null;
    }

    const types = this.types();

    if (!action || types.size === 0) {
      return null;
    }

    return (
      <Form className="Form Omniform" onSubmit={this.submitHandler}>
        {error && (
        <div className="Omniform__error">
          <FontAwesome name="exclamation-triangle" />
          {error}
        </div>
        )}
        <OmniformFields>
          {this.linkedFieldset()}
        </OmniformFields>
        <FormFooter>
          <LinkedResourceContainer subject={NS.app('c_a')} />
          {this.types()}
          <FormFooterRight>
            <Button
              plain
              disabled={invalid}
              icon="send"
              loading={false}
              theme="submit"
              type="submit"
            >
              Opslaan
            </Button>
          </FormFooterRight>
        </FormFooter>
      </Form>
    );
  }
}

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const actions = filterSort(ownProps.actions, FILTER, ORDER);
  const formName = `Omniform-${ownProps.parentIRI}`;
  const action = getOmniformAction(state, ownProps.parentIRI) || actions.first();

  return ({
    action,
    actions,
    currentValue: formValueSelector(formName)(state, 'search'),
    form: formName,
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  highlightResource: iri => dispatch(highlightResource(iri.value)),
  onActionChange: action => () => {
    dispatch(omniformSetAction({
      action,
      parentIRI: props.parentIRI,
    }));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  dispatchProps
);

const OmniformContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withLRS(Omniform));

export default OmniformContainer;
