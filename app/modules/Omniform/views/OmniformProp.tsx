import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  TopologyType,
  register,
  useGlobalIds,
  useLRS,
  useTopology,
} from 'link-redux';
import React from 'react';

import CollectionCreateButton, { TriggerType } from '../../../components/Collection/CollectionCreateButton';
import Heading from '../../../components/Heading';
import OmniformConnector from '../components/OmniformConnector';
import OmniformPreview from '../components/OmniformPreview';
import { entityIsLoaded } from '../../../helpers/data';
import app from '../../../ontology/app';
import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import {
  useOmniformClose,
  useOmniformOpenAction,
  useOmniformOpenedState,
} from '../lib/hooks';
import {
  cardAppendixTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
} from '../../../topologies';
import { actionsAreAllDisabled, useOmniformActions } from '../lib/helpers';

const ESCAPE_KEY = 27;

export interface OmniformProps {
  clickToOpen?: boolean;
  header?: string;
  linkedProp: SomeTerm;
  subject: NamedNode;
}

const useStyles = makeStyles({
  open: {
    padding:'0.75rem',
  },
});

const cardTopologies = new Set<TopologyType>([cardAppendixTopology, cardMainTopology, cardTopology]);

const OmniformProp: FC<OmniformProps> = (props) => {
  const classes = useStyles();
  const lrs = useLRS();
  const topology = useTopology();
  const types = useGlobalIds(rdfx.type);
  const potentialAction = useGlobalIds(schema.potentialAction);

  const opened = useOmniformOpenedState(props.subject);

  const items = useOmniformActions(potentialAction);

  const closeForm = useOmniformClose(props.subject);
  const openForm = useOmniformOpenAction(props.subject, items[0]);

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

  if (opened) {
    return (
      <React.Fragment>
        {renderHeader && (
          <Heading>
            {props.header}
          </Heading>
        )}
        <div className={cardTopologies.has(topology) ? classes.open : ''}>
          <OmniformConnector
            autofocusForm
            closeForm={closeForm}
            items={items}
            onDone={closeForm}
            onKeyUp={handleKey}
            {...props}
          />
        </div>
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
        <OmniformPreview
          primaryAction={items[0]}
          onClick={openForm}
        />
      </Collapse>
    </React.Fragment>
  );
};

OmniformProp.type = [schema.Thing, link.Document];

OmniformProp.property = app.omniform;

OmniformProp.topology = [
  cardAppendixTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
];

OmniformProp.defaultProps = {
  clickToOpen: true,
};

export default register(OmniformProp);
