import Collapse from '@material-ui/core/Collapse';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as schema from '@ontologies/schema';
import {
  FC,
  ReturnType,
  register,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';

import OmniformPreview from '../../../../components/Omniform/OmniformPreview';
import app from '../../../../ontology/app';
import link from '../../../../ontology/link';
import {
  UnscopedOmniformState,
  getOmniformOpenState,
  omniformCloseInline,
  omniformOpenInline,
} from '../../../../state/omniform';
import { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import CardRow from '../../../../topologies/Card/CardRow';

import { actionsAreAllDisabled, useActions } from './helpers';
import OmniformConnector from './OmniformConnector';

const KEY_ESCAPE = 27;

export interface CollapsedOmniformProps {
  clickToOpen?: boolean;
  closeForm: () => void;
  linkedProp: SomeTerm;
  openForm: () => void;
  opened?: boolean;
  potentialAction: NamedNode[];
  sameAs: NamedNode[];
  subject: NamedNode;
}

const mapInlineStateToProps = (state: UnscopedOmniformState, ownProps: CollapsedOmniformProps) => ({
  opened: getOmniformOpenState(state, ownProps.subject)
    || !!ownProps.sameAs.find((sameAs: NamedNode) => getOmniformOpenState(state, sameAs)),
});

const mapInlineDispatchToProps = (dispatch: (action: Action) => void, ownProps: CollapsedOmniformProps) => ({
  closeForm: () => Promise.resolve(dispatch(omniformCloseInline(ownProps.subject))),
  openForm: () => Promise.resolve(dispatch(omniformOpenInline(ownProps.subject))),
});

const CollapsedOmniformProp: FC<CollapsedOmniformProps> = (props) => {
  const {
    clickToOpen,
    closeForm,
    openForm,
    opened,
    potentialAction,
    sameAs,
  } = props;
  const lrs = useLRS();
  useDataFetching(sameAs);
  const items = useActions(potentialAction);

  const toggle = React.useCallback(() => {
    if (opened) {
      closeForm();
    } else {
      openForm();
    }
  }, [opened, closeForm, openForm]);

  const handleKey = React.useCallback((e) => {
    if (e.keyCode === KEY_ESCAPE) {
      closeForm();
    }
  }, [closeForm]);

  if (opened) {
    return (
      <CardRow borderTop>
        <OmniformConnector
          autofocusForm
          items={items}
          onDone={toggle}
          onKeyUp={handleKey}
          {...props}
        />
      </CardRow>
    );
  } else if (!clickToOpen) {
    return null;
  }

  const shouldShow = !(!clickToOpen || items.length === 0 || actionsAreAllDisabled(items, lrs));

  return (
    <Collapse
      mountOnEnter
      in={shouldShow}
    >
      <CardRow borderTop>
        <OmniformPreview
          primaryAction={items[0]}
          onClick={toggle}
        />
      </CardRow>
    </Collapse>
  );
};

CollapsedOmniformProp.type = [schema.Thing, link.Document];

CollapsedOmniformProp.property = app.omniform;

CollapsedOmniformProp.topology = [
  cardAppendixTopology,
  cardMainTopology,
  cardTopology,
];

CollapsedOmniformProp.mapDataToProps = {
  potentialAction: {
    label: schema.potentialAction,
    returnType: ReturnType.AllTerms,
  },
  sameAs: {
    label: owl.sameAs,
    returnType: ReturnType.AllTerms,
  },
};

CollapsedOmniformProp.hocs = [
  connect(mapInlineStateToProps, mapInlineDispatchToProps),
];

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

export default register(CollapsedOmniformProp);
