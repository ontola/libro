import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React, { KeyboardEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../../../../components/Heading';
import { entityIsLoaded } from '../../../../helpers/data';
import app from '../../../../ontology/app';
import link from '../../../../ontology/link';
import { allTopologiesExcept } from '../../../../topologies';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import { pageTopology } from '../../../../topologies/Page';
import { formMessages } from '../../../../translations/messages';

import { actionsAreAllDisabled, useActions } from './helpers';
import OmniformConnector from './OmniformConnector';

export interface OmniformProps {
  linkedProp: SomeTerm;
  onDone: () => void,
  onKeyUp: KeyboardEventHandler,
}

const OmniformProp: FC<OmniformProps> = ({
  onDone,
  onKeyUp,
  subject,
}) => {
  const lrs = useLRS();

  const potentialAction = useGlobalIds(schema.potentialAction);

  const items = useActions(potentialAction);
  const allDisabled = actionsAreAllDisabled(items, lrs);

  if (allDisabled) {
    return null;
  }

  return (
    <div style={{ marginTop: '3em' }}>
      {items.filter((item) => entityIsLoaded(lrs, item)).length > 0 && (
        <Heading>
          <FormattedMessage {...formMessages.omniformHeader} />
        </Heading>
      )}
      <Card>
        <OmniformConnector
          autofocusForm={false}
          items={items}
          subject={subject}
          onDone={onDone}
          onKeyUp={onKeyUp}
        />
      </Card>
    </div>
  );
};

OmniformProp.type = [schema.Thing, link.Document];

OmniformProp.property = app.omniform;

OmniformProp.topology = allTopologiesExcept(
  cardTopology,
  cardMainTopology,
  cardAppendixTopology,
  pageTopology,
);

export default register(OmniformProp);
