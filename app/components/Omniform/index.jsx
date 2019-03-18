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
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { allowSort } from '../../helpers/data';
import { NS } from '../../helpers/LinkedRenderStore';
import { highlightResource } from '../../state/app/actions';
import { showSignInForm } from '../../state/form/actions';
import { getOmniformAction, omniformSetAction } from '../../state/omniform';
import FormFooter from '../../topologies/FormFooter/Footer';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
import EntryPointBase from '../../views/EntryPoint/EntryPointBase';
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

export const FILTER = [
  /\/m\/new$/,
  /\/c\/new$/,
  /\/pros\/new/,
  /\/cons\/new$/,
  /\/actions\/create_opinion/,
  /\/actions\/update_opinion/,
];
export const ORDER = [
  '/actions/create_opinion',
  '/actions/update_opinion',
  '/m/new',
  '/c/new',
  '/pros/new',
  '/cons/new',
];
const PROPS_WHITELIST = [
  NS.schema('name'),
  NS.schema('text'),
  NS.argu('isOpinion'),
  NS.ontola('hiddenGroup'),
  NS.argu('attachments'),
  NS.argu('coverPhoto'),
  NS.schema('location'),
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


    return (
      <LinkedResourceContainer subject={action}>
        <Property
          forceRender
          autofocusForm={this.props.autofocusForm}
          formName={form}
          label={NS.schema('target')}
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
        formID={atob(this.props.parentIRI)}
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
                  icon="send"
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
  const actions = allowSort(ownProps.actions, FILTER, ORDER);
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
  onStatusForbidden: () => dispatch(showSignInForm(atob(props.parentIRI))),
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
