import Collapse from '@material-ui/core/Collapse';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  ReturnType,
  register,
  useDataFetching,
  useGlobalIds,
  useLRS,
  useTopology,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';

import CollectionCreateButton, { TriggerType } from '../../../../components/Collection/CollectionCreateButton';
import Heading from '../../../../components/Heading';
import OmniformConnector from '../../../../components/Omniform/OmniformConnector';
import OmniformPreview from '../../../../components/Omniform/OmniformPreview';
import { entityIsLoaded } from '../../../../helpers/data';
import app from '../../../../ontology/app';
import link from '../../../../ontology/link';
import ontola from '../../../../ontology/ontola';
import {
  UnscopedOmniformState,
  getOmniformOpenState,
  omniformCloseInline,
  omniformOpenInline,
} from '../../../../state/omniform';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import CardRow from '../../../../topologies/Card/CardRow';
import { containerTopology } from '../../../../topologies/Container';

import { actionsAreAllDisabled, useActions } from './helpers';

const KEY_ESCAPE = 27;

export interface CollapsedOmniformProps {
  clickToOpen?: boolean;
  closeForm: () => void;
  header?: string;
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
    header,
    sameAs,
  } = props;

  const lrs = useLRS();
  const topology = useTopology();
  const types = useGlobalIds(rdfx.type);

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

  if (items.length === 0) {
    const showFallback = types.includes(ontola.Collection);

    if (showFallback) {
      return <CollectionCreateButton trigger={TriggerType.Text} />;
    }

    return null;
  }

  const hasItems = items.filter((item) => entityIsLoaded(lrs, item)).length > 0;
  const renderHeader = header && hasItems;
  const Wrapper = topology === containerTopology ? 'div' : CardRow;
  const wrapperOpts = topology === containerTopology ? {} : { borderTop: true };
  const entryPointWrapper = topology === containerTopology ? Card : undefined;

  if (opened) {
    return (
      <React.Fragment>
        {renderHeader && (
          <Heading>
            {header}
          </Heading>
        )}
        <Wrapper {...wrapperOpts}>
          <OmniformConnector
            autofocusForm
            borderTop={topology !== containerTopology}
            entryPointWrapper={entryPointWrapper}
            items={items}
            onDone={toggle}
            onKeyUp={handleKey}
            {...props}
          />
        </Wrapper>
      </React.Fragment>
    );
  } else if (!clickToOpen) {
    return null;
  }

  const shouldShow = !(!clickToOpen || !hasItems || actionsAreAllDisabled(items, lrs));

  return (
    <React.Fragment>
      {renderHeader && (
        <Heading>
          {header}
        </Heading>
      )}
      <Collapse
        mountOnEnter
        in={shouldShow}
      >
        <Wrapper {...wrapperOpts}>
          <OmniformPreview
            primaryAction={items[0]}
            onClick={toggle}
          />
        </Wrapper>
      </Collapse>
    </React.Fragment>
  );
};

CollapsedOmniformProp.type = [schema.Thing, link.Document];

CollapsedOmniformProp.property = app.omniform;

CollapsedOmniformProp.topology = [
  cardAppendixTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
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
