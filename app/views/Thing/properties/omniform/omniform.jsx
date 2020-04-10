import schema from '@ontologies/schema';
import {
  ReturnType,
  linkType,
  register,
  subjectType,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../../../../components/Heading';
import isPastDate from '../../../../helpers/date';
import app from '../../../../ontology/app';
import argu from '../../../../ontology/argu';
import link from '../../../../ontology/link';
import { allTopologiesExcept } from '../../../../topologies';
import Card, { cardTopology } from '../../../../topologies/Card';
import { cardAppendixTopology } from '../../../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import { pageTopology } from '../../../../topologies/Page';

import { actionsAreAllDisabled, useFilterActions } from './helpers';
import OmniformConnector from './OmniformConnector';

const useIsSelfOrParentExpired = (expiresAt, isPartOf) => {
  const [parentExpiry] = useResourceProperty(isPartOf, argu.expiresAt);
  const [grandParent] = useResourceProperty(isPartOf, schema.isPartOf);
  const [grandParentExpiry] = useResourceProperty(grandParent, argu.expiresAt);

  if (isPastDate(expiresAt)) {
    return true;
  }

  if (isPartOf) {
    return isPastDate(parentExpiry) || isPastDate(grandParentExpiry);
  }

  return false;
};

const OmniformProp = ({
  expiresAt,
  formFooterButtons,
  isPartOf,
  onDone,
  onKeyUp,
  potentialAction,
  subject,
}) => {
  const isExpired = useIsSelfOrParentExpired(expiresAt, isPartOf);
  const allDisabled = actionsAreAllDisabled(useFilterActions(potentialAction));

  if (isExpired) {
    return (
      <Heading variant="notice">
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
        opened
        autofocusForm={false}
        formFooterButtons={formFooterButtons}
        potentialAction={potentialAction}
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
  pageTopology
);

OmniformProp.mapDataToProps = {
  expiresAt: argu.expiresAt,
  isPartOf: schema.isPartOf,
  potentialAction: {
    label: schema.potentialAction,
    returnType: ReturnType.AllTerms,
  },
};

OmniformProp.propTypes = {
  expiresAt: linkType,
  formFooterButtons: PropTypes.node,
  isPartOf: linkType,
  onDone: PropTypes.func,
  onKeyUp: PropTypes.func,
  potentialAction: linkType,
  subject: subjectType,
};

export default register(OmniformProp);
