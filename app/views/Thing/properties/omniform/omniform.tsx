import { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  ReturnType,
  register,
  useLRS,
  useResourceProperty,
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
  expiresAt: SomeTerm;
  isPartOf: NamedNode;
  linkedProp: SomeTerm;
  onDone: () => void,
  onKeyUp: KeyboardEventHandler,
  potentialAction: NamedNode[];
}

const useIsSelfOrParentExpired = (expiresAt: SomeTerm, isPartOf: NamedNode) => {
  const [parentExpiry] = useResourceProperty(isPartOf, argu.expiresAt);
  const [grandParent] = useResourceProperty(isPartOf, schema.isPartOf) as NamedNode[];
  const [grandParentExpiry] = useResourceProperty(grandParent, argu.expiresAt);

  if (isPastDate(expiresAt)) {
    return true;
  }

  if (isPartOf) {
    return isPastDate(parentExpiry) || isPastDate(grandParentExpiry);
  }

  return false;
};

const OmniformProp: FC<OmniformProps> = ({
  expiresAt,
  isPartOf,
  onDone,
  onKeyUp,
  potentialAction,
  subject,
}) => {
  const lrs = useLRS();
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

OmniformProp.mapDataToProps = {
  expiresAt: argu.expiresAt,
  isPartOf: schema.isPartOf,
  potentialAction: {
    label: schema.potentialAction,
    returnType: ReturnType.AllTerms,
  },
};

export default register(OmniformProp);
