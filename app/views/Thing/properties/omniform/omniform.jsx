import schema from '@ontologies/schema';
import {
  linkType,
  lrsType,
  register,
  subjectType,
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

import { actionsAreAllDisabled, filterActions } from './helpers';
import OmniformConnector from './OmniformConnector';

class OmniformProp extends React.PureComponent {
  static type = [schema.Thing, link.Document];

  static property = app.omniform;

  static topology = allTopologiesExcept(cardTopology, cardMainTopology, cardAppendixTopology);

  static mapDataToProps = {
    expiresAt: argu.expiresAt,
    isPartOf: schema.isPartOf,
    potentialAction: {
      label: schema.potentialAction,
      limit: Infinity,
    },
  };

  static propTypes = {
    expiresAt: linkType,
    formFooterButtons: PropTypes.node,
    isPartOf: linkType,
    lrs: lrsType,
    onDone: PropTypes.func,
    onKeyUp: PropTypes.func,
    potentialAction: linkType,
    subject: subjectType,
  };

  selfOrParentExpired() {
    const {
      expiresAt,
      isPartOf,
      lrs,
    } = this.props;

    if (isPastDate(expiresAt)) {
      return true;
    }

    if (isPartOf) {
      if (isPastDate(lrs.getResourceProperty(isPartOf, argu.expiresAt))) {
        return true;
      }

      const grandParent = lrs.getResourceProperty(isPartOf, schema.isPartOf);
      if (grandParent && isPastDate(lrs.getResourceProperty(grandParent, argu.expiresAt))) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { lrs, potentialAction } = this.props;

    if (this.selfOrParentExpired()) {
      return (
        <Heading variant="notice">
          <FormattedMessage
            defaultMessage="Responding is no longer possible"
            id="https://app.argu.co/i18n/expireable/states/closed/closedMessage"
          />
        </Heading>
      );
    }

    const allDisabled = actionsAreAllDisabled(filterActions(lrs, potentialAction), lrs);
    if (allDisabled) {
      return null;
    }

    return (
      <Card>
        <OmniformConnector
          opened
          autofocusForm={false}
          formFooterButtons={this.props.formFooterButtons}
          potentialAction={potentialAction}
          subject={this.props.subject}
          onDone={this.props.onDone}
          onKeyUp={this.props.onKeyUp}
        />
      </Card>
    );
  }
}

export default register(OmniformProp);
