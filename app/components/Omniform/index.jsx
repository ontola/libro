import rdf, { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { Set } from 'immutable';
import {
  LinkedResourceContainer,
  Property,
  subjectType,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import { highlightResource } from '../../state/app/actions';
import { getOmniformAction, omniformSetAction } from '../../state/omniform';
import FormFooter from '../../topologies/FormFooter/Footer';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
import EntryPointBase from '../../views/EntryPoint/EntryPointBase';
import { filterActions } from '../../views/Thing/properties/omniform/helpers';
import Button from '../Button';
import { Form, FormFooterRight } from '../Form';

import './Omniform.scss';

const propTypes = {
  // The NamedNode of the currently selected form.
  action: subjectType,
  actions: PropTypes.instanceOf(Set).isRequired,
  autofocusForm: PropTypes.bool,
  error: PropTypes.string,
  // Unique name of the form
  form: PropTypes.string.isRequired,
  formFooterButtons: PropTypes.node,
  // From redux-forms
  invalid: PropTypes.bool,
  onActionChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
};

const PROPS_WHITELIST = [
  schema.name,
  schema.text,
  NS.argu('isOpinion'),
  ontola.hiddenGroup,
  NS.argu('attachments'),
  ontola.coverPhoto,
  schema.location,
].map(t => rdf.id(t));

class Omniform extends EntryPointBase {
  action() {
    return this.props.action;
  }

  linkedFieldset() {
    const {
      action,
      form,
      onKeyUp,
    } = this.props;
    if (!isNamedNode(action)) {
      return null;
    }

    return (
      <LinkedResourceContainer subject={action}>
        <Property
          forceRender
          autofocusForm={this.props.autofocusForm}
          formName={form}
          label={schema.target}
          whitelist={PROPS_WHITELIST}
          onKeyUp={onKeyUp}
        />
      </LinkedResourceContainer>
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
      .map(iri => (
        <LinkedResourceContainer key={iri} subject={iri}>
          <Property
            current={rdf.equals(iri, this.props.action)}
            label={schema.result}
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
      formInstance,
    } = this.props;

    if (actions.length === 0) {
      return null;
    }

    const types = this.types();

    if (!action || types.size === 0) {
      return null;
    }

    return (
      <Form
        className="Form Omniform"
        form={formInstance}
        formID={`${atob(this.props.parentIRI)}.omniform`}
        onSubmit={this.submitHandler}
      >
        {({ invalid, submitting }) => (
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
            <FormFooter>
              {this.footerGroup()}
              {this.types()}
              <FormFooterRight>
                {this.props.formFooterButtons}
                <Button
                  disabled={invalid}
                  loading={submitting}
                  theme="submit"
                  type="submit"
                >
                  <FormattedMessage
                    defaultMessage="save"
                    id="https://app.argu.co/i18n/actions/labels/save"
                  />
                </Button>
              </FormFooterRight>
            </FormFooter>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const actions = filterActions(ownProps.lrs, ownProps.actions);

  const formName = `Omniform-${ownProps.parentIRI}`;
  const action = getOmniformAction(state, ownProps.parentIRI) || actions.first();

  return ({
    action,
    actions,
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
  onStatusForbidden: () => props
    .lrs
    .actions
    .app
    .startSignIn(rdf.namedNode(atob(props.parentIRI)))
    .then(Promise.reject),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  dispatchProps
);

const OmniformContainer = withLRS(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Omniform));

export default OmniformContainer;
