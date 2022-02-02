import Collapse from '@material-ui/core/Collapse';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useDataFetching,
  useGlobalIds,
  useLRS,
  useTopology,
} from 'link-redux';
import React from 'react';

import CollectionCreateButton, { TriggerType } from '../../../../components/Collection/CollectionCreateButton';
import Heading from '../../../../components/Heading';
import OmniformConnector from '../../../../components/Omniform/OmniformConnector';
import OmniformPreview from '../../../../components/Omniform/OmniformPreview';
import { entityIsLoaded } from '../../../../helpers/data';
import app from '../../../../ontology/app';
import link from '../../../../ontology/link';
import ontola from '../../../../ontology/ontola';
import {
  getOmniformOpenState,
  omniformCloseInline,
  omniformContext,
  omniformOpenInline,
} from '../../../../state/omniform';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import CardRow from '../../../../topologies/Card/CardRow';
import { containerTopology } from '../../../../topologies/Container';

import {
  actionsAreAllDisabled,
  useActions,
} from './helpers';

const ESCAPE_KEY = 27;

export interface CollapsedOmniformProps {
  clickToOpen?: boolean;
  header?: string;
  linkedProp: SomeTerm;
  subject: NamedNode;
}

const CollapsedOmniformProp: FC<CollapsedOmniformProps> = (props) => {
  const lrs = useLRS();
  const topology = useTopology();
  const types = useGlobalIds(rdfx.type);
  const potentialAction = useGlobalIds(schema.potentialAction);
  const sameAs = useGlobalIds(owl.sameAs);

  const { omniformState, setOmniformState } = React.useContext(omniformContext);
  const opened = getOmniformOpenState(omniformState, props.subject.value)
    || !!sameAs.find((sAs: NamedNode) => getOmniformOpenState(omniformState, sAs.value));

  useDataFetching(sameAs);
  const items = useActions(potentialAction);

  const closeForm = React.useCallback(
    () => setOmniformState(omniformCloseInline(omniformState, props.subject.value)),
    [props.subject.value, omniformState],
  );
  const openForm = React.useCallback(
    () => setOmniformState(omniformOpenInline(omniformState, props.subject.value)),
    [props.subject.value, omniformState],
  );

  const toggle = React.useCallback(() => {
    if (opened) {
      closeForm();
    } else {
      openForm();
    }
  }, [opened, closeForm, openForm]);

  const handleKey = React.useCallback((e) => {
    if (e.keyCode === ESCAPE_KEY) {
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
  const renderHeader = props.header && hasItems;
  const Wrapper = topology === containerTopology ? 'div' : CardRow;
  const wrapperOpts = topology === containerTopology ? {} : { borderTop: true };
  const entryPointWrapper = topology === containerTopology ? Card : undefined;

  if (opened) {
    return (
      <React.Fragment>
        {renderHeader && (
          <Heading>
            {props.header}
          </Heading>
        )}
        <Wrapper {...wrapperOpts}>
          <OmniformConnector
            autofocusForm
            borderTop={topology !== containerTopology}
            closeForm={closeForm}
            entryPointWrapper={entryPointWrapper}
            items={items}
            onDone={toggle}
            onKeyUp={handleKey}
            {...props}
          />
        </Wrapper>
      </React.Fragment>
    );
  } else if (!props.clickToOpen) {
    return null;
  }

  const shouldShow = props.clickToOpen && hasItems && !actionsAreAllDisabled(items, lrs);

  return (
    <React.Fragment>
      {renderHeader && (
        <Heading>
          {props.header}
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

CollapsedOmniformProp.defaultProps = {
  clickToOpen: true,
};

export default register(CollapsedOmniformProp);
