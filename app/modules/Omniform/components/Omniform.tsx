import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rdf, { Node, isNamedNode } from '@ontologies/core';
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

import { StartSignIn } from '../../../middleware/actions';
import { Navigate } from '../../Common/middleware/actions';
import { BreakPoints, LibroTheme } from '../../Kernel/lib/themes';
import { SubmitSuccessHandler } from '../../Action/views/EntryPoint/useSubmitHandler';
import { OnDoneHandler } from '../../Action/views/helpers';
import argu from '../../Argu/ontology/argu';
import { useHighlight } from '../../Common/components/HighlightProvider/HighlightProvider';
import ll from '../../Kernel/ontology/ll';
import ontola from '../../Kernel/ontology/ontola';
import { FormFooterRight } from '../../Form/components/Form';
import { FormFieldError } from '../../Form/components/FormField/FormFieldTypes';
import FormFooter from '../../Form/topologies/FormFooter';
import { useOmniformActiveAction, useOmniformChangeFactory } from '../lib/hooks';
import OmniformFields from '../topologies/OmniformFields/OmniformFields';

export interface OmniformProps {
  actions: Set<Node>;
  autofocusForm?: boolean;
  closeForm?: () => void;
  error?: FormFieldError;
  formInstance?: FormApi<any, Partial<any>>;
  onCancel?: () => void;
  onDone?: OnDoneHandler;
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
  const theme = useTheme<LibroTheme>();
  const lrs = useLRS();
  const { highlightState, setHighlightState } = useHighlight();

  const action = useOmniformActiveAction(props.parentIRI) ?? props.actions.values().next().value;
  const onActionChange = useOmniformChangeFactory(props.parentIRI);

  const onStatusForbidden = React.useCallback((e: () => Promise<void>) => {
    convertFieldContext(props.parentIRI, action);
    lrs.actions.get(Navigate)(action);

    return lrs
      .actions
      .get(StartSignIn)(action)
      .then(() => Promise.reject(e));
  }, [props.parentIRI, action]);

  const [submitLabel] = useStrings(action, dig(schema.target, schema.name));
  const classes = useStyles();

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
  ), [props.actions, props.parentIRI, action]);

  const onDone = React.useCallback<SubmitSuccessHandler>((response) => {
    if (props.onDone) {
      props.onDone(response.iri);
    }

    if (response.iri) {
      setHighlightState(response.iri.value);
    }
  }, [highlightState]);

  const linkedFieldset = React.useCallback(() => {
    const screenIsNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Medium));
    const screenIsVeryNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Small));

    if (!isNamedNode(action)) {
      return null;
    }

    const object = lrs.getResourceProperty(action, schema.object);
    const showSwitcher = types.length > 1 && !screenIsVeryNarrow;

    const footer = (loading: boolean): JSX.Element => (
      <FormFooter>
        <Property label={ll.actionBody} />
        {showSwitcher ? types : null}
        <FormFooterRight
          crammed={screenIsNarrow}
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
          footer={footer}
          formInstance={props.formInstance}
          key={action.value}
          label={schema.target}
          object={object}
          parentIRI={props.parentIRI}
          sessionStore={props.sessionStore}
          whitelist={PROPS_WHITELIST}
          onCancel={props.onCancel}
          onDone={onDone}
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
