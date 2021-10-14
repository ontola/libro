import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useFields,
  useGlobalIds,
  useIds,
  useLRS,
  useProperty,
} from 'link-redux';
import React, { KeyboardEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading, { HeadingVariant } from '../../../../components/Heading';
import isPastDate from '../../../../helpers/date';
import app from '../../../../ontology/app';
import argu from '../../../../ontology/argu';
import link from '../../../../ontology/link';
import { allTopologiesExcept } from '../../../../topologies';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import { pageTopology } from '../../../../topologies/Page';

import { actionsAreAllDisabled, useActions } from './helpers';
import OmniformConnector from './OmniformConnector';

export interface OmniformProps {
  linkedProp: SomeTerm;
  onDone: () => void,
  onKeyUp: KeyboardEventHandler,
}

const useIsSelfOrParentExpired = (expiresAt: SomeTerm, isPartOf: SomeNode) => {
  const [parentExpiry] = useFields(isPartOf, argu.expiresAt);
  const [grandParent] = useIds(isPartOf, schema.isPartOf);
  const [grandParentExpiry] = useFields(grandParent, argu.expiresAt);

  if (isPastDate(expiresAt)) {
    return true;
  }

  if (isPartOf) {
    return isPastDate(parentExpiry) || isPastDate(grandParentExpiry);
  }

  return false;
};

const OmniformProp: FC<OmniformProps> = ({
  onDone,
  onKeyUp,
  subject,
}) => {
  const lrs = useLRS();

  const [expiresAt] = useProperty(argu.expiresAt);
  const [isPartOf] = useIds(schema.isPartOf);
  const potentialAction = useGlobalIds(schema.potentialAction);

  const items = useActions(potentialAction);
  const isExpired = useIsSelfOrParentExpired(expiresAt, isPartOf);
  const allDisabled = actionsAreAllDisabled(items, lrs);

  if (isExpired) {
    return (
      <Heading variant={HeadingVariant.Notice}>
        <FormattedMessage
          defaultMessage="Responding is no longer possible"
          id="https://app.argu.co/i18n/expireable/states/closed/closedMessage"
        />
      </Heading>
    );
  }

  if (allDisabled) {
    return null;
  }

  return (
    <Card>
      <OmniformConnector
        autofocusForm={false}
        items={items}
        subject={subject}
        onDone={onDone}
        onKeyUp={onKeyUp}
      />
    </Card>
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
