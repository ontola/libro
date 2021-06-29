import rdf, { Node, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  SubjectType,
  useLRS,
  withLRS,
} from 'link-redux';
import { LinkedRenderStoreContext } from 'link-redux/dist-types/types';
import React, { KeyboardEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';

import argu from '../../ontology/argu';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { highlightResource } from '../../state/app/actions';
import {
  UnscopedOmniformState,
  getOmniformAction,
  omniformSetAction,
} from '../../state/omniform';
import FormFooter from '../../topologies/FormFooter';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
import Button, { ButtonTheme } from '../Button';
import { FormFooterRight } from '../Form';
import { FormFieldError } from '../FormField';

import './Omniform.scss';

export interface OmniformProps {
  actions: Set<Node>;
  autofocusForm?: boolean;
  closeForm?: () => void;
  error?: FormFieldError;
  formInstance?: Record<string, unknown>;
  onCancel?: () => void;
  onDone?: () => void;
  onKeyUp?: KeyboardEventHandler;
  parentIRI: string;
  sessionStore?: Record<string, unknown>;
}

export type OmniformOwnProps = LinkedRenderStoreContext & OmniformProps;

export interface OmniformDispatchProps {
  dispatchHighlightResource: (iri: Node) => void;
  onActionChange: (iri: Node) => void;
}

export interface OmniformStateProps {
  // The NamedNode of the currently selected form.
  action: SubjectType;
  onStatusForbidden?: (e: () => Promise<void>) => Promise<void>;
}

const PROPS_WHITELIST = [
  schema.creator,
  schema.name,
  schema.text,
  ontola.coverPhoto,
  schema.location,
  argu.attachments,
  argu.isOpinion,
  ontola.coverPhoto,
].map((t) => rdf.id(t));

const convertFieldContext = (parentIRI: string, actionIRI: Node) => {
  const omniformKey = `${atob(parentIRI)}.omniform`;
  Array(sessionStorage.length)
    .fill(null)
    .map((_, i) => sessionStorage.key(i)!)
    .filter((key) => key.startsWith(omniformKey))
    .forEach((key) => {
      const newKey = key.replace(omniformKey, actionIRI.value);
      const value = sessionStorage.getItem(key)!;
      sessionStorage.setItem(newKey, value);
      sessionStorage.removeItem(key);
    });
};

const Omniform = (props: OmniformProps & OmniformStateProps & OmniformDispatchProps): JSX.Element | null => {
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
    Array.from(actions).map((iri) => (
      <Resource key={iri!.value} subject={iri}>
        <Property
          current={rdf.equals(iri, action)}
          label={schema.result}
          onClick={onActionChange(iri!)}
        />
      </Resource>
    ))
  ), [actions, action]);

  const responseCallback = React.useCallback((response) => {
    if (response.iri) {
      dispatchHighlightResource(response.iri);
    }
  }, [dispatchHighlightResource]);

  const linkedFieldset = React.useCallback(() => {
    if (!isNamedNode(action)) {
      return null;
    }
    const object = lrs.getResourceProperty(action, schema.object);

    const footer = (loading: boolean): JSX.Element => (
      <FormFooter borderTop>
        <Property label={ll.actionBody} />
        {types}
        <FormFooterRight>
          {closeForm && (
            <Button
              theme={ButtonTheme.Transparant}
              onClick={closeForm}
            >
              <FormattedMessage defaultMessage="cancel" id="https://app.argu.co/i18n/forms/actions/cancel" />
            </Button>
          )}
          <Button
            loading={loading}
            type="submit"
          >
            <FormattedMessage
              defaultMessage="save"
              id="https://app.argu.co/i18n/actions/labels/save"
            />
          </Button>
        </FormFooterRight>
      </FormFooter>
    );

    return (
      <Resource subject={action}>
        <Property
          forceRender
          autofocusForm={autofocusForm}
          footer={footer}
          formInstance={formInstance}
          key={action.value}
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
  }, [
    autofocusForm,
    formInstance,
    action,
    parentIRI,
    responseCallback,
    sessionStore,
    PROPS_WHITELIST,
    onCancel,
    onDone,
    onKeyUp,
    onStatusForbidden,
  ]);

  if (actions.size === 0) {
    return null;
  }

  if (!action || types.length === 0) {
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

const mapStateToProps = (state: UnscopedOmniformState, ownProps: OmniformOwnProps): OmniformStateProps => {
  const action = getOmniformAction(state, ownProps.parentIRI) || ownProps.actions.values().next().value;

  return ({
    action,
    onStatusForbidden: (e: () => Promise<void>) => {
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

const mapDispatchToProps = (dispatch: (action: Action) => void, props: OmniformOwnProps) => ({
  dispatchHighlightResource: (iri: Node) => dispatch(highlightResource(iri.value)),
  onActionChange: (action: Node) => () => {
    dispatch(omniformSetAction({
      action,
      parentIRI: props.parentIRI,
    }));
  },
});

const mergeProps = (
  stateProps: OmniformStateProps,
  dispatchProps: OmniformDispatchProps,
  ownProps: OmniformOwnProps,
) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const OmniformContainer = withLRS(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Omniform));

export default OmniformContainer;
