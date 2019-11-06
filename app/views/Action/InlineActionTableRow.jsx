import rdf from '@ontologies/core';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { allTopologies } from '../../topologies';

const mapDataToProps = {
  actionStatus: NS.schema('actionStatus'),
  object: NS.schema('object'),
  target: NS.schema('target'),
};

class InlineActionTableRow extends React.PureComponent {
  static propTypes = {
    actionStatus: linkType,
    completed: PropTypes.string,
    lrs: lrsType,
    subject: subjectType,
    target: linkType,
  };

  render() {
    const {
      actionStatus,
      completed,
      lrs,
      subject,
      target,
    } = this.props;

    if (rdf.equals(actionStatus, NS.ontola('DisabledActionStatus'))) {
      return null;
    }
    if (rdf.equals(actionStatus, NS.schema('CompletedActionStatus'))) {
      return <span>{completed}</span>;
    }

    const handleClick = () => lrs
      .exec(subject)
      .catch((e) => {
        handle(e);
      });

    if (!target) {
      return null;
    }

    return (
      <LinkedResourceContainer
        subject={target}
        onClick={handleClick}
      />
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link(mapDataToProps)(props => (
      <InlineActionTableRow
        completed={(
          <FormattedMessage
            defaultMessage="Primary e-mail address"
            id="https://app.argu.co/i18n/actions/MakePrimaryAction/defaultEmailLabel"
          />
        )}
        {...props}
      />
    )),
    NS.argu('MakePrimaryAction'),
    RENDER_CLASS_NAME,
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    link(mapDataToProps)(props => (
      <InlineActionTableRow
        completed={(
          <FormattedMessage
            defaultMessage="Already confirmed"
            id="https://app.argu.co/i18n/actions/SendConfirmationAction/confirmedLabel"
          />
        )}
        {...props}
      />
    )),
    NS.argu('SendConfirmationAction'),
    RENDER_CLASS_NAME,
    allTopologies
  ),
];
