import { makeStyles } from '@material-ui/styles';
import rdf, {
  Node,
  isNamedNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FormApi } from 'final-form';
import {
  Property,
  Resource,
  dig,
  useLRS,
  useStrings,
} from 'link-redux';
import React, { KeyboardEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import argu from '../../ontology/argu';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { highlightContext } from '../../state/highlight';
import {
  getOmniformAction,
  omniformContext,
  omniformSetAction,
} from '../../state/omniform';
import { LibroTheme } from '../../themes/themes';
import FormFooter from '../../topologies/FormFooter';
import OmniformFields from '../../topologies/OmniformFields/OmniformFields';
import { FormFooterRight } from '../Form';
import { FormFieldError } from '../FormField';

export interface OmniformProps {
  actions: Set<Node>;
  autofocusForm?: boolean;
  borderTop?: boolean;
  closeForm?: () => void;
  entryPointWrapper?: React.ElementType;
  error?: FormFieldError;
  formInstance?: FormApi<any, Partial<any>>;
  onCancel?: () => void;
  onDone?: () => void;
  onKeyUp?: KeyboardEventHandler;
  parentIRI: string;
  sessionStore?: Record<string, unknown>;
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

const useStyles = makeStyles<LibroTheme>((theme) => ({
  omniformError: {
    color: theme.palette.red.main,
    span: {
      fontSize: '.7em',
      marginLeft: '.6em',
      marginRight: '.3em',
    },
  },
}));

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

const Omniform = (props: OmniformProps): JSX.Element | null => {
  const lrs = useLRS();
  const { omniformState, setOmniformState } = React.useContext(omniformContext);
  const { highlightState, setHighlightState } = React.useContext(highlightContext);

  // The NamedNode of the currently selected form.
  const action = getOmniformAction(omniformState, props.parentIRI) ?? props.actions.values().next().value;

  const onStatusForbidden = (e: () => Promise<void>) => {
    convertFieldContext(props.parentIRI, action);
    lrs.actions.ontola.navigate(action);

    return lrs
      .actions
      .app
      .startSignIn(action)
      .then(() => Promise.reject(e));
  };

  const [submitLabel] = useStrings(action, dig(schema.target, schema.name));
  const classes = useStyles();

  const onActionChange = (actionNode: Node) => () => {
    setOmniformState(omniformSetAction(omniformState, {
      action: actionNode,
      parentIRI: props.parentIRI,
    }));
  };

  const types = React.useMemo(() => (
    Array.from(props.actions).map((iri) => (
      <Resource
        key={iri.value}
        subject={iri}
      >
        <Property
          current={rdf.equals(iri, action)}
          label={schema.result}
          onClick={onActionChange(iri)}
        />
      </Resource>
    ))
  ), [props.actions, action]);

  const responseCallback = React.useCallback((response) => {
    if (response.iri) {
      setHighlightState(response.iri);
    }
  }, [highlightState]);

  const linkedFieldset = React.useCallback(() => {
    if (!isNamedNode(action)) {
      return null;
    }

    const object = lrs.getResourceProperty(action, schema.object);

    const footer = (loading: boolean): JSX.Element => (
      <FormFooter borderTop={props.borderTop}>
        <Property label={ll.actionBody} />
        {types.length > 1 ? types : null}
        <FormFooterRight
          loading={loading}
          submitLabel={submitLabel}
          onCancel={props.closeForm}
        />
      </FormFooter>
    );

    return (
      <Resource subject={action}>
        <Property
          forceRender
          autofocusForm={props.autofocusForm}
          entryPointWrapper={props.entryPointWrapper}
          footer={footer}
          formInstance={props.formInstance}
          key={action.value}
          label={schema.target}
          object={object}
          parentIRI={props.parentIRI}
          responseCallback={responseCallback}
          sessionStore={props.sessionStore}
          whitelist={PROPS_WHITELIST}
          onCancel={props.onCancel}
          onDone={props.onDone}
          onKeyUp={props.onKeyUp}
          onStatusForbidden={onStatusForbidden}
        />
      </Resource>
    );
  }, [
    action,
    props.autofocusForm,
    props.formInstance,
    props.parentIRI,
    props.sessionStore,
    PROPS_WHITELIST,
    submitLabel,
    props.onCancel,
    props.onDone,
    props.onKeyUp,
    onStatusForbidden,
  ]);

  if (props.actions.size === 0) {
    return null;
  }

  if (!action || types.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {props.error && (
        <div className={classes.omniformError}>
          <FontAwesome name="exclamation-triangle" />
          {props.error}
        </div>
      )}
      <OmniformFields>
        {linkedFieldset()}
      </OmniformFields>
    </React.Fragment>
  );
};

export default Omniform;
