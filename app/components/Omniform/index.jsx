import { Set } from 'immutable';
import { LinkedResourceContainer, Property, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { formValueSelector, reduxForm, reset } from 'redux-form/immutable';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import {
  getOmniformAction,
  omniformInitialize,
  omniformSetAction,
} from '../../state/omniform';
import { NS } from '../../helpers/LinkedRenderStore';
import Button from '../Button';
import { FormFooter, FormFooterRight } from '../Form';

import './Omniform.scss';

const propTypes = {
  actions: PropTypes.instanceOf(Set).isRequired,
  // The NamedNode of the currently selected form.
  currentAction: subjectType,
  error: PropTypes.string,
  // Unique name of the form
  form: PropTypes.string.isRequired,
  // Redux-form's handleSubmit implementation
  handleSubmit: PropTypes.func.isRequired,
  // From redux-form
  invalid: PropTypes.bool,
  onActionChange: PropTypes.func.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  // Our submit handler which must be passed to `handleSubmit`.
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const FILTER = [
  '/create_vote',
  '/destroy_vote',
];
const ORDER = [
  '/create_motion',
  '/create_comment',
  '/create_pro_argument',
  '/create_con_argument',
];

class Omniform extends React.Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  linkedFieldset() {
    const { currentAction, form, onKeyUp } = this.props;
    if (!(currentAction instanceof NamedNode)) {
      return null;
    }

    return (
      <LinkedResourceContainer subject={currentAction}>
        <Property
          forceRender
          formName={form}
          label={NS.app('omniformFieldset')}
          onKeyUp={onKeyUp}
        />
      </LinkedResourceContainer>
    );
  }

  types() {
    return this
      .props
      .actions
      .map(iri => (
        <LinkedResourceContainer key={iri} subject={iri}>
          <Property
            current={iri === this.props.currentAction}
            label={NS.schema('result')}
            onClick={this.props.onActionChange(iri)}
          />
        </LinkedResourceContainer>
      ));
  }

  render() {
    const {
      actions,
      currentAction,
      error,
      form,
      invalid,
      submitting,
      submitHandler,
      handleSubmit,
    } = this.props;

    if (actions.length === 0) {
      return null;
    }

    const types = this.types();

    if (!currentAction || types.size === 0) {
      return null;
    }

    return (
      <form
        className="Omniform"
        onSubmit={handleSubmit(submitHandler)}
      >
        {error &&
          <div className="Omniform__error">
            <FontAwesome name="exclamation-triangle" />
            {error}
          </div>
        }
        {this.linkedFieldset()}
        <FormFooter>
          <LinkedResourceContainer subject={NS.app('c_a')} />
          {this.types()}
          <FormFooterRight>
            <Button
              plain
              disabled={invalid}
              icon="send"
              loading={submitting}
              type="submit"
            >
              Opslaan
            </Button>
          </FormFooterRight>
        </FormFooter>
      </form>
    );
  }
}

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const actions = ownProps.actions
    .filter(iri => FILTER.findIndex(f => iri.value.includes(f)) === -1)
    .sort((a, b) => {
      const oA = ORDER.findIndex(o => a.value.includes(o));
      const oB = ORDER.findIndex(o => b.value.includes(o));

      if (oA === -1) return 1;
      if (oB === -1) return -1;
      if (oA < oB) return 0;
      if (oA > oB) return 1;
      return -1;
    });
  const formName = `Omniform-${ownProps.parentIRI}`;
  const currentAction = getOmniformAction(state, ownProps.parentIRI) || actions.first();

  return ({
    actions,
    currentAction,
    currentValue: formValueSelector(formName)(state, 'search'),
    form: formName,
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  onActionChange: action => () => {
    dispatch(omniformSetAction({
      currentAction: action,
      parentIRI: props.parentIRI,
    }));
  },
  onInitialize: action => dispatch(omniformInitialize({
    currentAction: action,
    parentIRI: props.parentIRI,
  })),
  resetForm: formName => dispatch(reset(formName)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  dispatchProps,
  {
    onInitialize: () => dispatchProps.onInitialize(stateProps.actions.first()),
    submitHandler: values => ownProps
      .submitHandler({ selectedAction: stateProps.currentAction }, values.toJS())
      .then(() => dispatchProps.resetForm(stateProps.form)),
  }
);

const OmniformContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({
  enableReinitialize: false
})(Omniform));

export default OmniformContainer;
