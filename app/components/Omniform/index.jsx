import rdf, { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { Set } from 'immutable';
import {
  Property,
  Resource,
  subjectType,
  useLRS,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { highlightResource } from '../../state/app/actions';
import { getOmniformAction, omniformSetAction } from '../../state/omniform';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
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
  closeForm: PropTypes.func,
  dispatchHighlightResource: PropTypes.func,
  error: formFieldError,
  formInstance: PropTypes.objectOf(PropTypes.any),
  onActionChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
  onKeyUp: PropTypes.func,
  onStatusForbidden: PropTypes.func,
  parentIRI: PropTypes.string,
  sessionStore: PropTypes.objectOf(PropTypes.any),
};

const PROPS_WHITELIST = [
  schema.name,
  schema.text,
  ontola.coverPhoto,
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

const Omniform = (props) => {
  const {
    action,
    actions,
    autofocusForm,
    closeForm,
    dispatchHighlightResource,
    error,
    formInstance,
    onActionChange,
    onCancel,
    onDone,
    onKeyUp,
    onStatusForbidden,
    parentIRI,
    sessionStore,
  } = props;
  const lrs = useLRS();
  const types = React.useMemo(() => (
    actions.map((iri) => (
      <Resource key={iri} subject={iri}>
        <Property
          current={rdf.equals(iri, action)}
          label={schema.result}
          onClick={onActionChange(iri)}
        />
      </Resource>
    ))
  ));
  const responseCallback = React.useCallback((response) => {
    if (response.iri) {
      dispatchHighlightResource(response.iri);
    }
  });
  const linkedFieldset = React.useCallback(() => {
    if (!isNamedNode(action)) {
      return null;
    }
    const object = lrs.getResourceProperty(action, schema.object);

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
          autofocusForm={autofocusForm}
          footerButtons={footerButtons}
          formInstance={formInstance}
          label={schema.target}
          object={object}
          parentIRI={parentIRI}
          responseCallback={responseCallback}
          sessionStore={sessionStore}
          whitelist={PROPS_WHITELIST}
          onCancel={onCancel}
          onDone={onDone}
          onKeyUp={onKeyUp}
          onStatusForbidden={onStatusForbidden}
        />
      </Resource>
    );
  });

  if (actions.length === 0) {
    return null;
  }

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
        {linkedFieldset()}
      </OmniformFields>
    </React.Fragment>
  );
};

Omniform.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const actions = filterActions(ownProps.lrs, ownProps.actions);

  const action = getOmniformAction(state, ownProps.parentIRI) || actions.first();

  return ({
    action,
    actions,
    onStatusForbidden: (e) => {
      convertFieldContext(ownProps.parentIRI, action);
      ownProps.lrs.actions.ontola.navigate(action);

      return ownProps
        .lrs
        .actions
        .app
        .startSignIn(action)
        .then(() => Promise.reject(e));
    },
  });
};

const mapDispatchToProps = (dispatch, props) => ({
  dispatchHighlightResource: (iri) => dispatch(highlightResource(iri.value)),
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
